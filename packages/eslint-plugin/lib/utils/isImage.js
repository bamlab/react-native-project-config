module.exports = (element) => {
  if (element.type === "JSXOpeningElement") {
    if (
      element.name.type == "JSXIdentifier" &&
      element.name.name.endsWith("Image")
    ) {
      if (element.parent && element.parent.children.length > 0) {
        return false;
      }

      return true;
    }
  }

  return false;
};
