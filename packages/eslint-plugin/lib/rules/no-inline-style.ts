//Flat config adaptation of no-inline-style rule from https://github.com/Intellicode/eslint-plugin-react-native/blob/master/lib/rules/no-inline-styles.js
//@ts-nocheck
import { inspect } from "node:util";
import type { Rule } from "eslint";

/**
 * -----------------------------------------------------------------------------
 * Components utility (inlined)
 * -----------------------------------------------------------------------------
 */
function Components() {
  this.list = {};
  this.getId = function (node) {
    return node && node.range.join(":");
  };
}
Components.prototype.add = function (node, confidence) {
  const id = this.getId(node);
  if (this.list[id]) {
    if (confidence === 0 || this.list[id].confidence === 0) {
      this.list[id].confidence = 0;
    } else {
      this.list[id].confidence = Math.max(this.list[id].confidence, confidence);
    }
    return;
  }
  this.list[id] = { node, confidence };
};
Components.prototype.get = function (node) {
  const id = this.getId(node);
  return this.list[id];
};
Components.prototype.set = function (node, props) {
  let currentNode = node;
  while (currentNode && !this.list[this.getId(currentNode)]) {
    currentNode = node.parent;
  }
  if (!currentNode) return;
  const id = this.getId(currentNode);
  this.list[id] = { ...this.list[id], ...props };
};
Components.prototype.all = function () {
  const list = {};
  Object.keys(this.list).forEach((i) => {
    if ({}.hasOwnProperty.call(this.list, i) && this.list[i].confidence >= 2) {
      list[i] = this.list[i];
    }
  });
  return list;
};
Components.prototype.length = function () {
  let length = 0;
  Object.keys(this.list).forEach((i) => {
    if ({}.hasOwnProperty.call(this.list, i) && this.list[i].confidence >= 2) {
      length += 1;
    }
  });
  return length;
};

function componentRule(rule, context, _node) {
  const sourceCode = context.getSourceCode();
  const components = new Components();

  const utils = {
    isES5Component(node) {
      if (!node.parent) return false;
      return /^(React\.)?createClass$/.test(
        sourceCode.getText(node.parent.callee),
      );
    },
    isES6Component(node) {
      if (!node.superClass) return false;
      return /^(React\.)?(Pure)?Component$/.test(
        sourceCode.getText(node.superClass),
      );
    },
    isReturningJSX(node) {
      let property;
      switch (node.type) {
        case "ReturnStatement":
          property = "argument";
          break;
        case "ArrowFunctionExpression":
          property = "body";
          break;
        default:
          return false;
      }
      const returnsJSX =
        node[property] &&
        (node[property].type === "JSXElement" ||
          node[property].type === "JSXFragment");
      const returnsReactCreateElement =
        node[property] &&
        node[property].callee &&
        node[property].callee.property &&
        node[property].callee.property.name === "createElement";
      return Boolean(returnsJSX || returnsReactCreateElement);
    },
    getParentComponent(_n) {
      return (
        utils.getParentES6Component(_n) ||
        utils.getParentES5Component(_n) ||
        utils.getParentStatelessComponent(_n)
      );
    },
    getParentES5Component(_n) {
      let scope = context.getSourceCode().getScope(_n);
      while (scope) {
        const node =
          scope.block && scope.block.parent && scope.block.parent.parent;
        if (node && utils.isES5Component(node)) return node;
        scope = scope.upper;
      }
      return null;
    },
    getParentES6Component(_n) {
      let scope = context.getSourceCode().getScope(_n);
      while (scope && scope.type !== "class") scope = scope.upper;
      const node = scope && scope.block;
      if (!node || !utils.isES6Component(node)) return null;
      return node;
    },
    getParentStatelessComponent(_n) {
      let scope = context.getSourceCode().getScope(_n);
      while (scope) {
        const node = scope.block;
        const isFunction = /Function/.test(node.type);
        const isNotMethod =
          !node.parent || node.parent.type !== "MethodDefinition";
        const isNotArgument =
          !node.parent || node.parent.type !== "CallExpression";
        if (isFunction && isNotMethod && isNotArgument) return node;
        scope = scope.upper;
      }
      return null;
    },
    getRelatedComponent(node) {
      let currentNode = node;
      const componentPath = [];
      while (currentNode) {
        if (
          currentNode.property &&
          currentNode.property.type === "Identifier"
        ) {
          componentPath.push(currentNode.property.name);
        }
        if (currentNode.object && currentNode.object.type === "Identifier") {
          componentPath.push(currentNode.object.name);
        }
        currentNode = currentNode.object;
      }
      componentPath.reverse();

      const variableName = componentPath.shift();
      if (!variableName) return null;

      const { variables } = context.getSourceCode().getScope(_node);
      let variableInScope;
      for (let i = 0; i < variables.length; i += 1) {
        if (variables[i].name === variableName) {
          variableInScope = variables[i];
          break;
        }
      }
      if (!variableInScope) return null;

      const { defs } = variableInScope;
      let defInScope;
      for (let i = 0; i < defs.length; i += 1) {
        if (["ClassName", "FunctionName", "Variable"].includes(defs[i].type)) {
          defInScope = defs[i];
          break;
        }
      }
      if (!defInScope) return null;

      currentNode = defInScope.node.init || defInScope.node;

      for (let i = 0; i < componentPath.length; i += 1) {
        if (!currentNode.properties) continue;
        for (let k = 0; k < currentNode.properties.length; k += 1) {
          if (currentNode.properties[k].key.name === componentPath[i]) {
            currentNode = currentNode.properties[k];
            break;
          }
        }
        if (!currentNode) return null;
        currentNode = currentNode.value;
      }
      return components.get(currentNode);
    },
  };

  const detectionInstructions = {
    ClassDeclaration(node) {
      if (!utils.isES6Component(node)) return;
      components.add(node, 2);
    },
    ClassProperty(_n) {
      const node = utils.getParentComponent(_n);
      if (!node) return;
      components.add(node, 2);
    },
    ObjectExpression(node) {
      if (!utils.isES5Component(node)) return;
      components.add(node, 2);
    },
    FunctionExpression(_n) {
      const node = utils.getParentComponent(_n);
      if (!node) return;
      components.add(node, 1);
    },
    FunctionDeclaration(_n) {
      const node = utils.getParentComponent(_n);
      if (!node) return;
      components.add(node, 1);
    },
    ArrowFunctionExpression(_n) {
      const node = utils.getParentComponent(_n);
      if (!node) return;
      if (node.expression && utils.isReturningJSX(node)) {
        components.add(node, 2);
      } else {
        components.add(node, 1);
      }
    },
    ThisExpression(_n) {
      const node = utils.getParentComponent(_n);
      if (!node || !/Function/.test(node.type)) return;
      components.add(node, 0);
    },
    ReturnStatement(node) {
      if (!utils.isReturningJSX(node)) return;
      const parentNode = utils.getParentComponent(node);
      if (!parentNode) return;
      components.add(parentNode, 2);
    },
  };

  const ruleInstructions = rule(context, components, utils);
  const updatedRuleInstructions = { ...ruleInstructions };
  Object.keys(detectionInstructions).forEach((instruction) => {
    updatedRuleInstructions[instruction] = (node) => {
      detectionInstructions[instruction](node);
      return ruleInstructions[instruction]
        ? ruleInstructions[instruction](node)
        : undefined;
    };
  });
  return updatedRuleInstructions;
}
Components.detect = function (rule) {
  return componentRule.bind(this, rule);
};

/**
 * -----------------------------------------------------------------------------
 * Stylesheet helpers (inlined)
 * -----------------------------------------------------------------------------
 */
let currentContent;
const getSourceCode = (node) =>
  currentContent.getSourceCode(node).getText(node);
const getStyleSheetObjectNames = (settings) =>
  (settings && settings["react-native/style-sheet-object-names"]) || [
    "StyleSheet",
  ];

function StyleSheets() {
  this.styleSheets = {};
}
StyleSheets.prototype.add = function (styleSheetName, properties) {
  this.styleSheets[styleSheetName] = properties;
};
StyleSheets.prototype.markAsUsed = function (fullyQualifiedName) {
  const nameSplit = fullyQualifiedName.split(".");
  const styleSheetName = nameSplit[0];
  const styleSheetProperty = nameSplit[1];
  if (this.styleSheets[styleSheetName]) {
    this.styleSheets[styleSheetName] = this.styleSheets[styleSheetName].filter(
      (property) => property.key.name !== styleSheetProperty,
    );
  }
};
StyleSheets.prototype.getUnusedReferences = function () {
  return this.styleSheets;
};
StyleSheets.prototype.addColorLiterals = function (expressions) {
  if (!this.colorLiterals) this.colorLiterals = [];
  this.colorLiterals = this.colorLiterals.concat(expressions);
};
StyleSheets.prototype.getColorLiterals = function () {
  return this.colorLiterals;
};
StyleSheets.prototype.addObjectExpressions = function (expressions) {
  if (!this.objectExpressions) this.objectExpressions = [];
  this.objectExpressions = this.objectExpressions.concat(expressions);
};
StyleSheets.prototype.getObjectExpressions = function () {
  return this.objectExpressions;
};

const astHelpers = {
  containsStyleSheetObject(node, objectNames) {
    return Boolean(
      node &&
        node.type === "CallExpression" &&
        node.callee &&
        node.callee.object &&
        node.callee.object.name &&
        objectNames.includes(node.callee.object.name),
    );
  },
  containsCreateCall(node) {
    return Boolean(
      node &&
        node.callee &&
        node.callee.property &&
        node.callee.property.name === "create",
    );
  },
  isStyleSheetDeclaration(node, settings) {
    const objectNames = getStyleSheetObjectNames(settings);
    return Boolean(
      this.containsStyleSheetObject(node, objectNames) &&
        this.containsCreateCall(node),
    );
  },
  getStyleSheetName(node) {
    if (node && node.parent && node.parent.id) return node.parent.id.name;
  },
  getStyleDeclarations(node) {
    if (
      node &&
      node.type === "CallExpression" &&
      node.arguments &&
      node.arguments[0] &&
      node.arguments[0].properties
    ) {
      return node.arguments[0].properties.filter(
        (property) => property.type === "Property",
      );
    }
    return [];
  },
  getStyleDeclarationsChunks(node) {
    if (
      node &&
      node.type === "CallExpression" &&
      node.arguments &&
      node.arguments[0] &&
      node.arguments[0].properties
    ) {
      const { properties } = node.arguments[0];
      const result = [];
      let chunk = [];
      for (let i = 0; i < properties.length; i += 1) {
        const property = properties[i];
        if (property.type === "Property") {
          chunk.push(property);
        } else if (chunk.length) {
          result.push(chunk);
          chunk = [];
        }
      }
      if (chunk.length) result.push(chunk);
      return result;
    }
    return [];
  },
  getPropertiesChunks(properties) {
    const result = [];
    let chunk = [];
    for (let i = 0; i < properties.length; i += 1) {
      const property = properties[i];
      if (property.type === "Property") {
        chunk.push(property);
      } else if (chunk.length) {
        result.push(chunk);
        chunk = [];
      }
    }
    if (chunk.length) result.push(chunk);
    return result;
  },
  getExpressionIdentifier(node) {
    if (!node) return "";
    switch (node.type) {
      case "Identifier":
        return node.name;
      case "Literal":
        return node.value;
      case "TemplateLiteral":
        return node.quasis.reduce(
          (result, quasi, index) =>
            result +
            quasi.value.cooked +
            this.getExpressionIdentifier(node.expressions[index]),
          "",
        );
      default:
        return "";
    }
  },
  getStylePropertyIdentifier(node) {
    if (node && node.key) return this.getExpressionIdentifier(node.key);
  },
  isStyleAttribute(node) {
    return Boolean(
      node.type === "JSXAttribute" &&
        node.name &&
        node.name.name &&
        node.name.name.toLowerCase().includes("style"),
    );
  },
  collectStyleObjectExpressions(node, context) {
    currentContent = context;
    if (this.hasArrayOfStyleReferences(node)) {
      const styleReferenceContainers = node.expression.elements;
      return this.collectStyleObjectExpressionFromContainers(
        styleReferenceContainers,
      );
    }
    if (node && node.expression) {
      return this.getStyleObjectExpressionFromNode(node.expression);
    }
    return [];
  },
  collectColorLiterals(node, context) {
    if (!node) return [];
    currentContent = context;
    if (this.hasArrayOfStyleReferences(node)) {
      const styleReferenceContainers = node.expression.elements;
      return this.collectColorLiteralsFromContainers(styleReferenceContainers);
    }
    if (node.type === "ObjectExpression")
      return this.getColorLiteralsFromNode(node);
    return this.getColorLiteralsFromNode(node.expression);
  },
  collectStyleObjectExpressionFromContainers(nodes) {
    let objectExpressions = [];
    nodes.forEach((n) => {
      objectExpressions = objectExpressions.concat(
        this.getStyleObjectExpressionFromNode(n),
      );
    });
    return objectExpressions;
  },
  collectColorLiteralsFromContainers(nodes) {
    let colorLiterals = [];
    nodes.forEach((n) => {
      colorLiterals = colorLiterals.concat(this.getColorLiteralsFromNode(n));
    });
    return colorLiterals;
  },
  hasArrayOfStyleReferences(node) {
    return (
      node &&
      node.type === "JSXExpressionContainer" &&
      node.expression &&
      node.expression.type === "ArrayExpression"
    );
  },
  getStyleObjectExpressionFromNode(node) {
    let left, right;
    if (!node) return [];
    if (node.type === "ObjectExpression")
      return [this.getStyleObjectFromExpression(node)];
    switch (node.type) {
      case "LogicalExpression":
        left = this.getStyleObjectExpressionFromNode(node.left);
        right = this.getStyleObjectExpressionFromNode(node.right);
        return [].concat(left).concat(right);
      case "ConditionalExpression":
        left = this.getStyleObjectExpressionFromNode(node.consequent);
        right = this.getStyleObjectExpressionFromNode(node.alternate);
        return [].concat(left).concat(right);
      default:
        return [];
    }
  },
  getColorLiteralsFromNode(node) {
    let left, right;
    if (!node) return [];
    if (node.type === "ObjectExpression")
      return [this.getColorLiteralsFromExpression(node)];
    switch (node.type) {
      case "LogicalExpression":
        left = this.getColorLiteralsFromNode(node.left);
        right = this.getColorLiteralsFromNode(node.right);
        return [].concat(left).concat(right);
      case "ConditionalExpression":
        left = this.getColorLiteralsFromNode(node.consequent);
        right = this.getColorLiteralsFromNode(node.alternate);
        return [].concat(left).concat(right);
      default:
        return [];
    }
  },
  getStyleObjectFromExpression(node) {
    const obj = {};
    let invalid = false;
    if (node.properties && node.properties.length) {
      node.properties.forEach((p) => {
        if (!p.value || !p.key) return;
        if (p.value.type === "Literal") {
          invalid = true;
          obj[p.key.name] = p.value.value;
        } else if (p.value.type === "ConditionalExpression") {
          const innerNode = p.value;
          if (
            innerNode.consequent.type === "Literal" ||
            innerNode.alternate.type === "Literal"
          ) {
            invalid = true;
            obj[p.key.name] = getSourceCode(innerNode);
          }
        } else if (
          p.value.type === "UnaryExpression" &&
          p.value.operator === "-" &&
          p.value.argument.type === "Literal"
        ) {
          invalid = true;
          obj[p.key.name] = -1 * p.value.argument.value;
        } else if (
          p.value.type === "UnaryExpression" &&
          p.value.operator === "+" &&
          p.value.argument.type === "Literal"
        ) {
          invalid = true;
          obj[p.key.name] = p.value.argument.value;
        }
      });
    }
    return invalid ? { expression: obj, node } : undefined;
  },
  getColorLiteralsFromExpression(node) {
    const obj = {};
    let invalid = false;
    if (node.properties && node.properties.length) {
      node.properties.forEach((p) => {
        if (
          p.key &&
          p.key.name &&
          p.key.name.toLowerCase().indexOf("color") !== -1
        ) {
          if (p.value.type === "Literal") {
            invalid = true;
            obj[p.key.name] = p.value.value;
          } else if (p.value.type === "ConditionalExpression") {
            const innerNode = p.value;
            if (
              innerNode.consequent.type === "Literal" ||
              innerNode.alternate.type === "Literal"
            ) {
              invalid = true;
              obj[p.key.name] = getSourceCode(innerNode);
            }
          }
        }
      });
    }
    return invalid ? { expression: obj, node } : undefined;
  },
  getObjectName(node) {
    if (node && node.object && node.object.name) return node.object.name;
  },
  getPropertyName(node) {
    if (node && node.property && node.property.name) return node.property.name;
  },
  getPotentialStyleReferenceFromMemberExpression(node) {
    if (
      node &&
      node.object &&
      node.object.type === "Identifier" &&
      node.object.name &&
      node.property &&
      node.property.type === "Identifier" &&
      node.property.name &&
      node.parent.type !== "MemberExpression"
    ) {
      return [node.object.name, node.property.name].join(".");
    }
  },
  isEitherShortHand(property1, property2) {
    const shorthands = ["margin", "padding", "border", "flex"];
    if (shorthands.includes(property1)) return property2.startsWith(property1);
    if (shorthands.includes(property2)) return property1.startsWith(property2);
    return false;
  },
};

/**
 * -----------------------------------------------------------------------------
 * The rule: no-inline-style
 * -----------------------------------------------------------------------------
 */
export const noInlineStyleRule: Rule.RuleModule = {
  meta: {
    type: "problem",
    docs: {
      description: "Detect inline styles in JSX",
    },
    messages: {
      noInline: "Inline style: {{expression}}",
    },
    schema: [],
  },

  create: Components.detect((context) => {
    const styleSheets = new StyleSheets();

    function reportInlineStyles(inlineStyles) {
      if (!inlineStyles) return;
      inlineStyles.forEach((style) => {
        if (style) {
          const expression = inspect(style.expression);
          context.report({
            node: style.node,
            messageId: "noInline",
            data: { expression },
          });
        }
      });
    }

    return {
      JSXAttribute(node) {
        if (astHelpers.isStyleAttribute(node)) {
          // node.value is a JSXExpressionContainer or literal
          const styles = astHelpers.collectStyleObjectExpressions(
            node.value,
            context,
          );
          styleSheets.addObjectExpressions(styles);
        }
      },
      "Program:exit"() {
        reportInlineStyles(styleSheets.getObjectExpressions());
      },
    };
  }),
};
