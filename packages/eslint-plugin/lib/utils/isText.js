module.exports = (element) => {
  if (element.type === "JSXOpeningElement") {
    if (element.name.type == "JSXIdentifier" && element.name.name === "Text") {
      return true; // <Text />
    }

    if (
      element.name.type === "JSXMemberExpression" &&
      element.name.object.name === "Typography"
    ) {
      return true; // <Typography.P1 />
    }
  }

  return false;
};
