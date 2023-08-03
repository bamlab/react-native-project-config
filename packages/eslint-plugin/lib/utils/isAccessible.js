const isImage = require("./isImage");
const isText = require("./isText");

module.exports = (element) => {
  if (element.type === "JSXOpeningElement") {
    for (const attribute of element.attributes) {
      if (
        attribute.type === "JSXAttribute" &&
        attribute.name.name === "accessible"
      ) {
        if (attribute.value === null) return true; // <View accessible />

        if (attribute.value.type === "JSXExpressionContainer") {
          return !(attribute.value.expression.value === false); // <View accessible={false} />
        }

        if (attribute.value.type === "Literal") {
          return !(attribute.value.value === "false"); // <View accessible="false" />
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

  return undefined; // undefined means we don't know if it's accessible or not
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
