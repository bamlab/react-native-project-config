/**
 * @fileoverview Image requires an accessible prop
 * @author Paul Briand
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
  meta: {
    hasSuggestions: true,
    type: "problem", // `problem`, `suggestion`, or `layout`
    docs: {
      description: "Require accessible prop on image components",
      recommended: false,
      url: "https://github.com/bamlab/react-native-project-config/tree/main/packages/eslint-plugin/docs/rules/image-requires-accessible-prop.md", // URL to the documentation page for this rule
    },
    fixable: "code", // Or `code` or `whitespace`
    schema: [], // Add a schema if the rule has options
    messages: {
      imageRequiresAccessibleProp: "Image components require accessible prop",
      suggestAddingAccessibleProp: "Add accessible prop",
    },
  },

  create(context) {
    return {
      JSXOpeningElement: (node) => {
        if (
          isImage(node) &&
          !node.attributes.some((attr) => attr.name.name === "accessible")
        ) {
          context.report({
            node,
            messageId: "imageRequiresAccessibleProp",
            suggest: [
              {
                messageId: "suggestAddingAccessibleProp",
                fix: (fixer) => {
                  const openingTagEnd = node.range[1];
                  return fixer.insertTextBeforeRange(
                    [openingTagEnd - (node.selfClosing ? 2 : 1), openingTagEnd],
                    " accessible={true}"
                  );
                },
              },
            ],
          });
        }
      },
    };
  },
};

const isImage = require("../utils/isImage");
