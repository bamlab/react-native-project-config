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

// This example breaks the rule allowUnreachableCode: false (https://www.typescriptlang.org/tsconfig#allowUnreachableCode)
// specified in the imported tsconfig.
const fn = (n: number) => {
  if (n > 5) {
    return true;
  } else {
    return false;
  }
  return true;
};
