// Rest parameters and spread operator

// Rest parameters : used to create functions that accept any number of arguments.
function sumAll(...args) {
  return args.reduce((sum, arg) => sum + arg, 0);
}

console.log(sumAll(1, 2)); // 3
console.log(sumAll(1, 2, 3, 4)); // 10
console.log(sumAll(1, 2, 3, 4, 5)); // 15

function multiplyAll(first, ...args) {
  return args.reduce((multiply, arg) => multiply * arg, first);
}

console.log(multiplyAll(1, 2)); // 2
console.log(multiplyAll(1, 2, 3, 4)); // 24
console.log(multiplyAll(1, 2, 3, 4, 5)); // 120

// Spread operator : used to pass an array to functions that require a list of arguments.
console.log(Math.max([1, 2, 3])); // NaN
console.log(Math.max(...[1, 2, 3])); // 3
console.log(Math.max(...[1, 2, 3], ...[4, 5, 6])); // 6
console.log([...[1, 2, 3], ...[4, 5, 6]]); // [1, 2, 3, 4, 5, 6] Array merge
