// Iterables - Array like

// Iterables :  objects that implement the Symbol.iterator method

// Make object iterable using [Symbol.Iterator]
const range = {
  start: 1,
  end: 3,
  // for ... of check for the existence of this method
  [Symbol.iterator]: function() {
    return {
      // returns the iterator object
      current: this.start,
      last: this.end,
      next() {
        // next() is called on each iteration by the for..of loop
        return this.current <= this.last
          ? { done: false, value: this.current++ }
          : { done: true }; // value as object
      }
    };
  }
};

for (const number of range) {
  console.log(number); // 1, 2, 3
}

// Strings are iterable
for (const char of "Hello") {
  console.log(char);
}

// H
// e
// l
// l
// o

// Calling an iterator explicitly
const string = "Hello";
const iterator = string[Symbol.iterator](); // Get the returned enumerator within string implementation
while (1) {
  const result = iterator.next(); // Call the iterator next() method
  if (result.done) break; // Break if all iterations done
  console.log(result.value); // Log the result value (current element)
}

// H
// e
// l
// l
// o

// Array like : objects that have indexes and length, so they look like arrays.

const arrayLike = {
  0: "Hello",
  1: "I'm",
  2: "John",
  3: "Doe",
  length: 4
};

console.log(arrayLike[2]); // John
console.log(arrayLike.length); // 4
// arrayLike.push("Test"); Error because not a real array

// Array.from : takes an iterable or array-like value and makes a “real” Array from it
const realArrayFromArrayLike = Array.from(arrayLike);
realArrayFromArrayLike.push("test"); // It works now

const realArrayFromRange = Array.from(range);
console.log(realArrayFromRange); // [1, 2, 3]

const realArrayFromRangeTransformed = Array.from(range, item => item * 2); // Apply a function using the 2nd arg
console.log(realArrayFromRangeTransformed); // [2, 4, 6]
