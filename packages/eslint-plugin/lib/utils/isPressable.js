module.exports = (element) => {
  if (element.type === "JSXOpeningElement") {
    return element.attributes.some((attribute) => {
      return (
        attribute.type === "JSXAttribute" && attribute.name.name === "onPress"
      );
    });
  }

  return false;
};
