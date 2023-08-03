const isImage = require("./isImage");
const isText = require("./isText");

const isAccessible = (element) => {
  if (element.type === "JSXOpeningElement") {
    for (const attribute of element.attributes) {
      if (
        attribute.type === "JSXAttribute" &&
        attribute.name.name === "accessible"
      ) {
        if (attribute.value === null) return true; // <View accessible />

        if (attribute.value.type === "JSXExpressionContainer") {
          return attribute.value.expression.value === true; // <View accessible={false} />
        }

        if (attribute.value.type === "Literal") {
          return attribute.value.value === "true"; // <View accessible="false" />
        }
      }
    }

    if (
      element.name.type === "JSXIdentifier" &&
      element.name.name.startsWith("Touchable")
    ) {
      return true; // <TouchableOpacity />
    }

    if (isImage(element)) {
      return element.attributes.some((attribute) => {
        attribute.name.name === "alt"; // <Image alt="..." />
      });
    }

    if (isTextInput(element)) {
      return true; // <TextInput />
    }

    if (isText(element)) {
      return true; // <Text />
    }
  }

  return false;
};

const isTextInput = (element) => {
  if (
    element.type === "JSXOpeningElement" &&
    element.name.type === "JSXIdentifier"
  ) {
    return ["TextInput", "Input", "Textarea"].includes(element.name.name);
  }
  return false;
};

const hasPropAccessible = (element) => {
  if (element.type === "JSXOpeningElement") {
    return element.attributes.some((attribute) => {
      return (
        attribute.type === "JSXAttribute" &&
        attribute.name.name === "accessible"
      );
    });
  }
  return false;
};

module.exports = {
  isAccessible,
  hasPropAccessible,
  isTextInput,
};
