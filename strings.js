// Strings

// Syntax
const singleQuote = "single-quoted"; // using single quotes
const doublleQuote = "double-quoted"; // using double quotes
const backticks = `backticks`; // using backticks

// Backticks features

// -interpolation
const fullname = "John Doe";
const interpolation = `Hello ${fullname} !`;
console.log(interpolation); // Hello John Doe !

// - multi lines
const items = `Items:
 - Item 1
 - Item 2
 - Item 3
`;
console.log(items);

/* 

OUTPUT:

Items:
 - Item 1
 - Item 2
 - Item 3
 
*/

/* Special characters */
console.log("\u00A9"); // ©
console.log("\n"); // new line

// Length
console.log("hello".length); // 5

// Accessing characters
console.log("hello"[0]); // h, modern way
console.log("hello".charAt(0)); // h, old way

console.log("hello"[6]); // undefined
console.log("hello".charAt(6)); // ""

for (let c of "hello") {
  console.log(c);
}

/* 

OUTPUT:

h 
e 
l 
l 
o 

*/

// Immutability
// "hello"[0] = "w"; TypeError: Cannot assign to read only property '0' of string 'hello'

// Case
console.log("Hello".toLowerCase()); // hello
console.log("Hello".toUpperCase()); // HELLO

// Searching for a substring

// - using .indexOf(substr, pos)
// looks for the substr in str, starting from the given position pos,
// and returns the position where the match was found or -1 if not found
console.log("Hello".indexOf("Hello")); // 0, found at index 0
console.log("Hello".indexOf("hello")); // -1, not found (case sensitive search)
console.log("Hello".indexOf("l")); // 2, first "l" found at position 2
console.log("Hello".indexOf("l", 3)); // 3, second "l" found at position 3

// Find all occurences of a substring within a string
const sampleOccurences = "Hello i'm John Doe";
const sampleOccurencesTarget = "o"; // We want to find all the occurences of the "o" letter
let index = -1;
while (
  (index = sampleOccurences.indexOf(sampleOccurencesTarget, index + 1)) !== -1
) {
  console.log(index);
}

/* 

OUTPUT:

4
11
16

*/

// - using .lastIndexOf(substr, pos)
// idem indexOf but from end to beginning

// - using .includes(substr, pos)
console.log("Hello".includes("llo")); // true
console.log("Hello".includes("zoo")); // false
console.log("Hello".includes("llo", 2)); // true
console.log("Hello".includes("llo", 3)); // false

// - using .startsWith(str)
console.log("Hello".startsWith("Hel")); // true
console.log("Hello".startsWith("lo")); // false

// - using endsWith(str)
console.log("Hello".endsWith("Hel")); // false
console.log("Hello".endsWith("lo")); // true

// Getting a substring

// - using str.slice(start [, end])
console.log("Hello".slice(2, 4)); // ll (end is not included)
console.log("Hello".slice(2)); // llo (until the end if no 2n arg)

// - using str.substring(start [, end])
// same as slice, but it allows start to be greater than end
// Negative arguments not supported

// - using str.substr(start [, length])
console.log("Hello".substr(1, 3)); // ell

// .split(separator)
// splits the string into an array by the given separator
const sentence = "I am John Doe";
const splittedSpace = sentence.split(" ");
const splittedLetter = sentence.split("");
console.log(splittedSpace); // ["I", "am", "John", "Doe"]
console.log(splittedLetter); // ["I", " ", "a", "m", " ", "J", "o", "h", "n", " ", "D", "o", "e"]

// .join(separator)
// creates a string from array items glued by separator between them.
const splittedBySpace = ["I", "am", "John", "Doe"];
const splittedByLetter = [
  "I",
  " ",
  "a",
  "m",
  " ",
  "J",
  "o",
  "h",
  "n",
  " ",
  "D",
  "o",
  "e"
];
const joinedSpace = splittedBySpace.join(" ");
const joinedLetter = splittedByLetter.join("");
console.log(joinedSpace); // I am John Doe
console.log(joinedLetter); // I am John Doe
