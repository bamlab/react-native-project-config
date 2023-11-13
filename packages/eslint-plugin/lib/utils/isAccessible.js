import isImage from "./isImage";
import isPressable from "./isPressable";
import isText from "./isText";
import isTextInput from "./isTextInput";

module.exports = (element) => {
  if (element.type === "JSXOpeningElement") {
    for (const attribute of element.attributes) {
      if (
        attribute.type === "JSXAttribute" &&
        attribute.name.name === "accessible"
      ) {
        if (attribute.value === null) return true;

        if (attribute.value.type === "JSXExpressionContainer") {
          return attribute.value.expression.value;
        }
      }
    }

    if (isPressable(element)) {
      return true;
    }

    if (isImage(element)) {
      for (const attribute of element.attributes) {
        if (attribute.name.name === "alt") {
          if (attribute.value.type === "Literal") {
            return !!attribute.value.value;
          }

          if (attribute.value.type === "JSXExpressionContainer")
            return !!attribute.value.expression.value;
        }
      }
    }
    if (isTextInput(element)) {
      return true;
    }

    if (isText(element)) {
      return true;
    }
  }

  return false;
};
