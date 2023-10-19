// This should trigger a warning because of array-callback-return rule
const myArray = [1, 2, 3];
const indexMap = myArray.reduce(function (acc, current) {
  acc = acc + current;
}, 0);
indexMap;
