// Property flag / Descriptors

// Object properties got 3 "special" values
// - writable
// - enumerable
// - configurable

// Get thoses values
const obj = { id: 1, label: "obj" };
const descriptorId = Object.getOwnPropertyDescriptor(obj, "id");
console.log(descriptorId);

/* 
OUTPUT: 

{
  value: 1
  writable: true
  enumerable: true
  configurable: true
}

*/

// Flag can be set using the third arguments
Object.defineProperty(obj, "order", {
  value: 1
});

// Not supplied flags are set to false
const descriptorOrder = Object.getOwnPropertyDescriptor(obj, "order");
console.log(descriptorOrder);

/* 
OUTPUT: 

{
  value: 1
  writable: true
  enumerable: true
  configurable: true
}

*/

// Readonly using writable : false
Object.defineProperty(obj, "id", {
  writable: false
});

// obj.id = 2; Cannot assign to read only property 'id' of object '#<Object>'

// Non-enumerable using enumerable : false
Object.defineProperty(obj, "id", {
  enumerable: false
});

for (let value in obj) {
  console.log(value); // Only the "label" prop has enumerable : true and is displayed
}

const keys = Object.keys(obj);
console.log(keys); // Only the "label" prop has enumerable : true and is displayed

// Non-configurable using configurable : false

// The prop cannot  be deleted
// delete obj.order; Cannot delete property 'order' of #<Object>

// The prop cannot be altered with .defineProperty()
// Object.defineProperty(obj, "order", {writable: true}); TypeError: Cannot redefine property: order

// Define many properties at once
Object.defineProperties(obj, {
  foo: { value: false, writable: false },
  bar: { value: 43, writable: false }
});

// Get all the property descriptors
const descriptors = Object.getOwnPropertyDescriptors(obj);
console.log(descriptors);

/* 
{
  id: {
    value: 1
    writable: false
    enumerable: false
    configurable: true
  },
  label: {
    value: "obj"
    writable: true
    enumerable: true
    configurable: true
  },
  order: {
    value: 1
    writable: false
    enumerable: false
    configurable: false
  },
  foo: {
    value: false
    writable: false
    enumerable: false
    configurable: false
  },
  bar: {
    value: 43
    writable: false
    enumerable: false
    configurable: false
  }
}
*/

// Clone with flags
const obj2 = Object.defineProperties({}, Object.getOwnPropertyDescriptors(obj));
