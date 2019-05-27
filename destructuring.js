// Destructuring assignment

// Array destructuring
const array = ["John", "Doe"];
const [firstname, lastname] = array;
console.log(firstname, lastname); // John Doe

const [number, street] = "11 downstreet".split(" "); // combined with .split()
console.log(number, street);

const [, city, country] = "90875 Boston USA".split(" "); // ignore elements with comma
console.log(city, country);

// Works with any iterable
const [a, b, c] = "abc"; // String
const [one, two, three] = new Set([1, 2, 3]); // Set
console.log(a, b, c); // ["a", "b", "c"]
console.log(one, two, three); // [1, 2, 3]

// Assign to anything
const user = {};
[user.firstname, user.lastname] = "John Doe".split(" ");
console.log(user.firstname, user.lastname); // John Doe

// The rest ... array of the remaining array elements
const [letterA, letterB, ...arrayRest] = ["A", "B", "C", "D"];
console.log(letterA, letterB); // A B
console.log(arrayRest); // ["C", "D"]

// Default values, can be a value or an expression / function call
const [
  number1,
  number2,
  number3,
  number4 = 4,
  number5 = 4 + 1,
  number6 = (function(arg) {
    return arg + 1;
  })(5)
] = [1, 2];
console.log(number1); // 1
console.log(number2); // 2
console.log(number3); // undefined
console.log(number4); // 4
console.log(number5); // 5
console.log(number6); // 6

// Object destructuring
const cssRules = {
  position: "absolute",
  backgroundColor: "#FCFCFC"
};

const { position, backgroundColor } = cssRules;
console.log(position, backgroundColor); // absolute #FCFCFC

const item = {
  id: 1,
  name: "Item 1"
};

const { id, name: label, order: priority = 0 } = item; // Rename "name" to "label", order to priority with defaut value
console.log(id, label, priority); // 1 "Item 1"  0

// The rest ... object of the remaining object properties
const claims = {
  isAdmin: false,
  isManager: true,
  isReviewer: true
};

const { isAdmin, ...objectRest } = claims;
console.log(isAdmin); // false
console.log(objectRest); // { isManager: true, isReviewer: true }

// using existing variable
const options = {
  option1: 1,
  option2: 2,
  option3: 3
};

let option1, option2, option3;
({ option1, option2, option3 } = options);
console.log(option1, option2, option3); // 1 2 3

// Nested destructuring
const data = {
  outer: {
    inner1: {
      foo: "bar"
    },
    inner2: 200
  },
  list: ["Item 1", "Item 2"],
  number: 102
};

let {
  outer: {
    inner1: { foo },
    inner1
  },
  list: [item1, item2],
  other = "other"
} = data;

console.log(foo); // bar
console.log(inner1); // { foo: "bar" }
console.log(item1, item2); // Item 1 Item 2
console.log(other); // other

// Destructuring as function parameters
function badFunction(array = [], min = 0, max, author) {
  // Bad
  console.log(array, min, max, author);
}

badFunction([1, 2], undefined, 2, "John"); // [1, 2] 0 2 "John"

function goodFunction({ array = [], min = 0, max, author }) {
  // Good
  console.log(array, min, max, author);
}

goodFunction({ array: [1, 2], max: 2, author: "John" }); // [1, 2] 1 2 "John"
// goodFunction() Error

function betterFunction({ array = [], min = 0, max, author } = {}) {
  // Better
  console.log(array, min, max, author);
}

betterFunction({ array: [1, 2], max: 2, author: "John" }); // [1, 2] 1 2 "John"
betterFunction(); // No Error but [] 0 undefined undefined
