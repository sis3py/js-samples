// JSON

// JSON.stringify()
// Natively supported JSON types are:
// - Objects
// - Arrays
// - Primitives:
// - strings,
// - numbers,
// - boolean
// - null.

const user = {
  id: 1,
  firstname: "John",
  lastname: "Doe",
  age: 30,
  partner: {
    id: 2,
    firstname: "Jane",
    lastname: "Doe"
  },
  [Symbol("creditCartNumber")]: 123412341234, // ignored because symbolic
  children: undefined, // ignored because undefined
  isReviewer() {
    return false;
  } // ignored because function
};

const jsonUser = JSON.stringify(user);
const jsonUserFilteredArray = JSON.stringify(user, [
  "id",
  "firstname",
  "lastname"
]);
const jsonUserFilteredArraySpaces = JSON.stringify(
  user,
  ["id", "firstname", "lastname"],
  4
);

console.log(jsonUser); // {"id":1,"firstname":"John","lastname":"Doe","age":30,"partner":{"id":2,"firstname":"Jane","lastname":"Doe"}}
console.log(jsonUserFilteredArray); // {"id":1,"firstname":"John","lastname":"Doe"}
console.log(jsonUserFilteredArraySpaces);
// OUTPUT:
//
// {
//   "id": 1,
//   "firstname": "John",
//   "lastname": "Doe"
// }

// Custom “toJSON”
const item = {
  id: 1,
  label: "Item 1",
  toJSON() {
    return "item 1";
  }
};

console.log(JSON.stringify(item)); // "item 1"

// JSON.parse
const parsedUser = JSON.parse('{"id":1,"firstname":"John","lastname":"Doe"}');
console.log(parsedUser); // {id: 1, firstname: "John", lastname: "Doe"}
