// Prototypal inheritance
// All objects have a hidden [[Prototype]] property that’s either another object or null
// The object referenced by [[Prototype]] is called a “prototype”

const animal = {
  animalType: "animal",
  describe() {
    return `An ${this.animalType} with ${this.furColor} fur, 
      ${this.legs} legs, and a ${this.tail} tail.`;
  }
};

// Factory function
const mouse = function mouse() {
  const secret = "secret agent"; // Private variable

  // Return a object with animal prototype + additional own properties
  return Object.assign(Object.create(animal), {
    // Object.create set animal as prototype
    animalType: "mouse",
    furColor: "brown",
    legs: 4,
    tail: "long, skinny",
    profession() {
      return secret; // Secret remains private using closure
    }
  });
};

// Build mickey, using the mouse() factory function
const mickey = mouse();

// /!\ Write/delete operations act directly on the object,
// They don’t use the prototype (assuming it’s a data property, not is a setter)

// obj.hasOwnProperty(key): it returns true if obj has its own (not inherited) key named key.
console.log(mickey.hasOwnProperty("describe")); // false
console.log(mickey.hasOwnProperty("profession")); // true

// Reflect.ownKeys(obj) – returns an array of all own keys.
console.log(Reflect.ownKeys(mickey)); // ["animalType", "furColor", "legs", "tail", "profession"]

// Object.getOwnPropertySymbols(obj) – returns an array of all own symbolic keys.
console.log(Object.getOwnPropertySymbols(mickey)); // []

// Object.getOwnPropertyNames(obj) – returns an array of all own string keys.
console.log(Object.getOwnPropertyNames(mickey)); // ["animalType", "furColor", "legs", "tail", "profession"]

// Object.getPrototypeOf(obj) – returns the [[Prototype]] of obj
console.log(Object.getPrototypeOf(mickey) === animal); // true

// Object.setPrototypeOf(obj, proto) – sets the [[Prototype]] of obj to proto
Object.setPrototypeOf(mickey, null);
console.log(Object.getPrototypeOf(mickey)); // null

// Prototype composition
const canFly = {
  // Fly behavior mixin
  fly() {
    console.log(`${this.animalType} is flying !`);
  }
};

const canSwim = {
  // Swim behavior mixin
  swim() {
    console.log(`${this.animalType} is swimming !`);
  }
};

const canRun = {
  // Run behavior mixin
  run() {
    console.log(`${this.animalType} is running !`);
  }
};

const canJump = {
  // Jump behavior mixin
  jump() {
    console.log(`${this.animalType} is jumping !`);
  }
};

// Create different types of animals with their related behaviors using the exising mixins
function hippo() {
  return Object.assign(
    Object.create(animal),
    { animalType: "hippo" },
    canSwim,
    canRun
  );
}

function tiger() {
  return Object.assign(
    Object.create(animal),
    { animalType: "tiger" },
    canSwim,
    canRun,
    canJump
  );
}

function duck() {
  return Object.assign(
    Object.create(animal),
    { animalType: "duck" },
    canSwim,
    canFly
  );
}

const hippo1 = hippo();
hippo1.swim(); // hippo is swimming !
hippo1.run(); // hippo is running !

const tiger1 = tiger();
tiger1.swim(); // tiger is swimming !
tiger1.run(); // tiger is running !
tiger1.jump(); // tiger is jumping !

const duck1 = duck();
duck1.swim(); // duck is swimming !
duck1.fly(); // duck is flying !
