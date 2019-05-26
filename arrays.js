// Arrays

const array1 = new Array();
const array2 = []; // common syntax
const array3 = ["string", { name: "John" }, false, () => "hi"]; // many types
console.log(array3[0]); // string
console.log(array3[3]()); // hi

// .push()
// appends an element to the end.
const arrayPush = [1, 2, 3];
arrayPush.push(4);
console.log(arrayPush); // [1, 2, 3, 4]

// .unshift()
// appends an element to the beginning.
const arrayUnshift = [1, 2, 3];
arrayUnshift.unshift(4);
console.log(arrayUnshift); // [4, 1, 2, 3]

// .shift()
// remove the first element et returns this element
const arrayShift = [1, 2, 3];
arrayShift.shift();
console.log(arrayShift); // [2, 3]

// .pop()
// remove the last element et returns this element
const arrayPop = [1, 2, 3];
arrayPop.pop();
console.log(arrayPop); // [1, 2]

// Iteration
const arrayIteration = [1, 2, 3, 4];
for (let item of arrayIteration) {
  console.log(item);
}

/* 

OUTPUT:

1
2
3
4

*/

/* .length */
const arrayLength = [1, 2, 3, 4, 5];
arrayLength.length = 3; // Truncate the array
console.log(arrayLength); // [1, 2, 3]

// Multidimensional
const arrayMatrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
console.log(arrayMatrix[1][1]); // 5

//  .toString()
const arrayToString = [1, 2, 3, 4, 5];
console.log(arrayToString.toString()); // 1,2,3,4,5

// .splice(index[, deleteCount, elem1, ..., elemN])
// starts from the position index: removes deleteCount elements and then inserts elem1, ..., elemN.
// Returns the array of removed elements.

const arraySplice1 = [1, 2, 3, 4, 5];
const removedFromArraySplice1 = arraySplice1.splice(0, 1); // means from index 0, remove 1 element
console.log(arraySplice1); // [2, 3, 4, 5]
console.log(removedFromArraySplice1); // [1], the array of removed elements

const arraySplice2 = [1, 2, 3, 4, 5];
arraySplice2.splice(0, 5, "1", "2", "3", "4"); // means from index 0, remove 5 elements and replace by "1", "2", "3", "4"
console.log(arraySplice2); // ["1", "2", "3", "4"]

const arraySplice3 = [1, 2, 3, 4, 5];
arraySplice3.splice(0, 0, 5, 6); // means from index 0, remove 0 elements and add by 5, 6
console.log(arraySplice3); // [5, 6, 1, 2, 3, 4, 5]

const arraySplice4 = [1, 2, 3, 4, 5];
arraySplice4.splice(-1, 1); // means from last index (-1), remove 1 element
console.log(arraySplice4); // [1, 2, 3, 4]

// .slice(start, end)
// returns a new array containing all items from index "start" to "end" (not including "end")
const arraySlice = [1, 2, 3, 4, 5];
const subArray = arraySlice.slice(0, 3);
console.log(subArray); // [1, 2, 3]

// .concat(arg1, arg2...)
// joins the array with other arrays and/or items
const arrayToConcat1 = [1, 2, 3, 4, 5];
const arrayToConcat2 = [6, 7];
const concatenated1 = arrayToConcat1.concat(arrayToConcat2); // Concat arrayToConcat1 + arrayToConcat2
const concatenated2 = arrayToConcat1.concat(arrayToConcat2, 8); // Concat arrayToConcat1 + arrayToConcat2 + add item 8
console.log(concatenated1); // [1, 2, 3, 4, 5, 6, 7]
console.log(concatenated2); // [1, 2, 3, 4, 5, 6, 7, 8]

// .forEach(function(item, index, array))
[1, 2, 3, 4, 5].forEach((item, index, array) => console.log(item));

/* 

OUTPUT: 

1
2
3
4
5

*/

// .indexOf(item, fromIndex)
// looks for item starting from index from, and returns the index where it was found, otherwise -1
const arrayIndexOf = [1, 2, 3, 4, 5];
console.log(arrayIndexOf.indexOf(3)); // 2

// .lastIndexOf(item, fromIndex)
// idem .indexOf from the end to the beginning
const arrayLastIndexOf = [2, 2, 3, 3, 4];
console.log(arrayLastIndexOf.lastIndexOf(3)); // 3

// .includes(item, from)
// looks for item starting from index from, returns true if found.
const arrayIncludes = [1, 2, 3, 4, 5];
console.log(arrayIncludes.includes(3)); // true
console.log(arrayIncludes.includes(6)); // false

// .flat(depth)
// creates a new array with all sub-array elements concatenated into it recursively up to the specified depth
const flattenedDepth1 = [[1, 2], [3]].flat();
const flattenedDepth3 = [[[1, [2]], [3]], [4], [5]].flat(3);
console.log(flattenedDepth1); // [1, 2, 3]
console.log(flattenedDepth3); // [1, 2, 3, 4, 5]

// .flatMap()
// maps each element using a mapping function, then flattens the result into a new array
const arrayToFlatMap = ["Hi", "i'm", "John", "Doe"];
console.log(arrayToFlatMap.map(x => x.split(" "))); // [["Hi"], ["i'm"], ["John"], ["Doe"]]
console.log(arrayToFlatMap.flatMap(x => x.split(" "))); // ["Hi", "i'm", "John", "Doe"]

// .find(predicate)
// returns the item if found otherwise undefined
const arrayFind = [1, 2, 3, 4, 5, 3];
const arrayFindResult1 = arrayFind.find(
  (item, index) => item === 3 && index > 3
);
const arrayFindResult2 = arrayFind.find(item => item === 6);
console.log(arrayFindResult1); // 3
console.log(arrayFindResult2); // undefined

// .findIndex(predicate)
// returns the index if found otherwise -1
const arrayFindIndex = [1, 2, 3, 4, 5, 3];
const arrayFindIndexResult1 = arrayFindIndex.findIndex(
  (item, index) => item === 3 && index > 3
);
const arrayFindIndexResult2 = arrayFindIndex.findIndex(item => item === 6);
console.log(arrayFindIndexResult1); // 5
console.log(arrayFindIndexResult2); // -1

// .filter(predicate)
// returns the matching items
const arrayFilter = [1, 2, 3, 4, 5];
const arrayFilterResult1 = arrayFilter.filter(item => item % 2 === 0);
const arrayFilterResult2 = arrayFilter.filter(item => item % 2 !== 0);
console.log(arrayFilterResult1); // [2, 4]
console.log(arrayFilterResult2); // [1, 3, 5]

// .map(function)
// calls a function for each element of the array and returns the array of results.
const arrayMap = [1, 2, 3, 4, 5];
const arrayMapDouble = arrayMap.map(item => item * 2);
console.log(arrayMapDouble); // [2, 4, 6, 8, 10]

// .sort(function)
// sort the array in place

const arraySort1 = [1, 10, 2];
arraySort1.sort();
console.log(arraySort1); // [1, 10, 2] items are sorted as string

const arraySort2 = [1, 10, 2];
arraySort2.sort((a, b) => {
  if (a > b) return 1;
  if (a < b) return -1;
  return 0;
});
console.log(arraySort2); // [1, 2, 10] items are correctly sorted as numbers

// A comparison function is only required to return a positive number to say “greater”
// and a negative number to say “less”.
const sortedArray = [4, 3, 2, 1].sort((a, b) => a - b);
console.log(sortedArray); // [1, 2, 3, 4]

// .reverse()
// reverses the order of elements
const reversedArray = [1, 2, 3, 4].reverse();
console.log(reversedArray); // [4, 3, 2, 1]

// .reduce(function, initial value)
// calculates a single value based on the array
const total = [1, 2, 3, 4, 5].reduce((total, current) => total + current, 0);
console.log(total); // 15

// .reduceRight(function, initial value)
// idem .reduce() but from the end to the beginning of th array

// .some(predicate)
// returns true if some items match the given predicate otherwise false
const arraySome = [1, 2, 3, 4, 5];
const someTest1 = arraySome.some(item => item === 5);
const someTest2 = arraySome.some(item => item === 6);
console.log(someTest1); // true
console.log(someTest2); // false

// .every(predicate)
// returns true if all items match the given predicate otherwise false
const arrayEvery = [1, 2, 3, 4, 5];
const everyTest1 = arrayEvery.every(item => item >= 1);
const everyTest2 = arrayEvery.every(item => item > 1);
console.log(everyTest1); // true
console.log(everyTest2); // false

// .isArray()
console.log(typeof {}); // object
console.log(typeof []); // object
console.log(Array.isArray({})); // false
console.log(Array.isArray([])); // true
