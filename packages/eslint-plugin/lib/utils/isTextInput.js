module.exports = (element) => {
  if (
    element.type === "JSXOpeningElement" &&
    element.name.type === "JSXIdentifier"
  ) {
    return ["TextInput", "Input", "Textarea"].includes(element.name.name);
  }
  return false;
};
