module.exports = (element) => {
  if (element.type === "JSXOpeningElement") {
    return element.attributes.some((attribute) => {
      return (
        attribute.type === "JSXAttribute" &&
        (attribute.name.name === "onPress" ||
          attribute.name.name === "handlePress")
      );
    });
  }

  return false;
};
