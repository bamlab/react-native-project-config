// This example breaks the rule noImplicitReturns (https://www.typescriptlang.org/tsconfig#noImplicitReturns)
// specified in the imported tsconfig.
export const lookupHeadphonesManufacturer = (
  color: "blue" | "black"
): string => {
  if (color === "blue") {
    return "beats";
  } else {
    ("bose");
  }
};
