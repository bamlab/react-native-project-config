module.exports = (element) => {
  if (element.type === "JSXOpeningElement") {
    return element.attributes.some((attribute) => {
      return (
        attribute.type === "JSXAttribute" &&
        ["accessibilityLabel", "aria-label", "alt"].includes(
          attribute.name.name
        )
      );
    });
  }
  return false;
};
