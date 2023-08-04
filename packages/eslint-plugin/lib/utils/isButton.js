module.exports = (element) => {
  if (element.type === "JSXOpeningElement") {
    if (
      element.name.type == "JSXIdentifier" &&
      element.name.name.endsWith("Button")
    ) {
      return true;
    }

    if (
      element.name.type === "JSXMemberExpression" &&
      element.name.object.name === "Button"
    ) {
      return true;
    }
  }

  return false;
};
