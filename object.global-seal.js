// 1 - Object.preventExtensions

// Prevents new properties from ever being added to an object
// (i.e. prevents future extensions to the object).
const object1 = {};

Object.preventExtensions(object1);

try {
  Object.defineProperty(object1, "property1", {
    value: 42
  });
} catch (e) {
  console.log(e); // TypeError: Cannot define property property1, object is not extensible
}

// Check if an object is extensible
const isObject1Extensible = Object.isExtensible(object1);
console.log(isObject1Extensible);

// 2 - Object.seal()

// Seals an object, preventing new properties from being added to it
// and marking all existing properties as non-configurable.
// Values of present properties can still be changed as long as they are writable.
const object2 = {
  property1: 42
};

Object.seal(object2);
object2.property1 = 33;

try {
  object2.property2 = 1;
} catch (e) {
  console.log(e); // TypeError: Cannot add property property2, object is not extensible
}

// Check if an object is sealed
const isObject2Sealed = Object.isSealed(object2);
console.log(isObject2Sealed);

// 3 - Object.freeze()

// Freezes an object :
// - prevents new properties from being added to it
// - existing properties from being removed
// - prevents changing the enumerability, configurability, or writability of existing properties
// - prevents the values of existing properties from being changed
// - prevents its prototype from being changed.

const object3 = {
  prop1: 42
};

Object.freeze(object3);

try {
  object3.prop2 = 1;
} catch (e) {
  console.log(e); // TypeError: Cannot add property prop2, object is not extensible
}

// Check if an object is frozen
const isObject3Frozen = Object.isFrozen(object3);
console.log(isObject3Frozen);
