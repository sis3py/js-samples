import { timingSafeEqual } from "crypto";

// Class

class User {
  constructor(firsname, lastname) {
    this.firsname = firsname;
    this.lastname = lastname;
  }

  hello() {
    console.log(`Hello i'm ${this.firsname} ${this.lastname}`);
  }
}

const user = new User("John", "Doe");
user.hello(); // Hello i'm John Doe

// /!\ Classes are functions
console.log(typeof User); // function
console.log(User === User.prototype.constructor); // true
console.log(User.prototype.hello); // function hello() {}
console.log(Object.getOwnPropertyNames(User.prototype)); // ["constructor", "hello"]

// It can be rewritten as function :
// function User(firsname, lastname) {
//   this.firsname = firsname;
//   this.lastname = lastname;
// }

// User.prototype.hello = function() {
//   console.log(`Hello i'm ${this.firsname} ${this.lastname}`);
// };

// const user = new User("John", "Doe");
// user.hello();

// Minor differences between class and function :
// - function created by class is labelled by a special internal property [[FunctionKind]]:"classConstructor"
// - a class constructor can’t be called without new
// - a string representation of a class constructor in most JavaScript engines starts with the “class…”
// - class methods are non-enumerable (enumerable: false)
// - classes always use strict

// Class Expression
const Game = class {
  start() {
    console.log("Game started");
  }
};

const game = new Game();
game.start(); // Game started

// Named Class Expression
const TestClass = class CustomClass {
  test() {
    console.log(MyClass); // MyClass is visible only inside the class
  }
};

const testClass = new TestClass();
// testClass.test(); // ReferenceError: MyClass is not defined

// Dynamic class creation
function makeTalkingClass(message) {
  // declare a class and return it
  return class {
    saySomething() {
      console.log(message);
    }
  };
}

const TalkingClass = makeTalkingClass("Hello dear");
new TalkingClass().saySomething(); // Hello dear

// With Getter / Setter and properties
class Item {
  constructor(name) {
    this._name = name;
  }
  get name() {
    return this._name;
  }

  set name(value) {
    if (value.length < 4) {
      console.log("Name is too short.");
      return;
    }
    this._name = value;
  }
}

const item = new Item("Item 1");
console.log(item.name); // Item 1
item.name = "Other Item 1";
console.log(item.name); // Other Item 1

// Inheritance : class Child extends Parent
// Internally :
// Child.prototype.__proto__ = Parent.prototype

class Animal {
  constructor(species) {
    this.species = species;
    this.isMoving = false;
  }
  eat(food) {
    console.log(`${this.species} is eating ${food}.`);
  }
  sleep() {
    console.log(`${this.species} is sleeping.`);
  }
  move() {
    this.isMoving = true;
  }
  stop() {
    this.isMoving = false;
  }
}

class Bird extends Animal {
  // inherit from Animal using extends
  // If no custom constructor, a default one will be created automatically
  // and looks like this :
  // constructor(...args) {
  //   super(...args);
  // }
  move() {
    // override parent .move()
    super.move();
    console.log(`${this.species} is flying!`);
  }
}

class Dog extends Animal {
  // Dog is using a custom constructor
  constructor(species, name) {
    super(species); // .super() call is mandatory for derived class with custom constructor !!
    this.name = name;
  }
  move() {
    super.move(); // override parent .move()
    console.log(`${this.name} is running !`);
  }
  stop() {
    // // fully override parent .stop() without super call
    console.log("I'm a dog, i never stop !");
  }
}

const bird = new Bird("Pigeon");
bird.move(); // Pigeon is flying!
bird.stop();
console.log(bird.isMoving); // false

const dog = new Dog("Husky", "Wilson");
dog.move(); // Wilson is running !
dog.stop(); // I'm a dog, i never stop !
console.log(dog.isMoving); // true

// nb: arrow functions doesnt not have super

// [[HomeObject]]
// When a function is specified as a class or object method,
// its [[HomeObject]] property becomes that object.
// This property is used by .super()

const animal = {
  species: "Animal",
  eat(food) {
    // animal.eat.[[HomeObject]] == animal
    console.log(`${this.species} is eating ${food}.`);
  }
};

const pigeon = {
  __proto__: animal,
  species: "Pigeon",
  eat(food) {
    // pigeon.eat.[[HomeObject]] == pigeon
    super.eat(food);
  }
};

const husky = {
  __proto__: animal,
  species: "Husky",
  eat(food) {
    // husky.eat.[[HomeObject]] == husky
    super.eat(food);
  }
};

// works correctly
husky.eat("Meat"); // Husky is eating Meat.

// Extends can use any expression
function makeBaseTest() {
  return class {
    test() {
      console.log("Test");
    }
  };
}
class Test extends makeBaseTest() {}

// Static properties and methods

// We can also assign a method to the class function, not to its "prototype".
// Such methods are called static.
// Thery are used to implement functions that belong to the class,
// but not to any particular object of it.

class Component {
  // static staticProperty = "I'm static"; // Future static Properties
  static staticMethod() {
    console.log(this === Component); // this is the class constructor Component
  }
}

class Button extends Component {}

Component.staticMethod(); // true
Button.staticMethod(); // false, static methods are inherited

// The static method is the same as assigning it as function property
User.staticMethod = function() {
  console(this === User);
};

// Extending built-in classes

class PowerArray extends Array {
  isEmpty() {
    // add a new isEmpty feature
    return this.length === 0;
  }
}

const array = new PowerArray(1, 2, 5, 10, 50);
console.log(array.isEmpty()); // false

const filteredArray = array.filter(item => item > 50);
console.log(filteredArray); // []
console.log(filteredArray.isEmpty()); // true
console.log(filteredArray.constructor); // PowerArray(), filter keep the initial type

// /!\ No static inheritance in built-ins methods, this is an exception

// Class checking: "instanceof"
// The instanceof operator allows to check whether an object belongs to a certain class.
// It also takes inheritance into account.
// obj instanceof Class can be rephrased as Class.prototype.isPrototypeOf(obj)

// returns true if obj belongs to the Class
class Vehicle {}
class Car extends Vehicle {}
const car = new Car();
console.log(car instanceof Car); // true
console.log(car instanceof Vehicle); // true

// also works with constructor functions:
function Book() {}
console.log(new Book() instanceof Book); // true

// also works with built-in classes like Array:
const numbers = [1, 2, 3];
console.log(numbers instanceof Array); // true
console.log(numbers instanceof Object); // true (Array prototypally inherits from Object)

// Custom instanceof behavior

// setup instanceOf check that assumes that anything that breathe is a living organism
class LivingOrganism {
  static [Symbol.hasInstance](obj) {
    return !!obj.canBreathe;
  }
}

const obj1 = { canBreathe: true };
const obj2 = { canBreathe: false };

// Animal[Symbol.hasInstance](obj) is called
console.log(obj1 instanceof LivingOrganism); // true
console.log(obj2 instanceof LivingOrganism); // false

// Nb: Most classes do not have Symbol.hasInstance.
// In that case, the standard logic is used: obj instanceOf Class checks
// whether Class.prototype equals to one of prototypes in the obj prototype chain :
// obj.__proto__ === Class.prototype
// obj.__proto__.__proto__ === Class.prototype
// obj.__proto__.__proto__.__proto__ === Class.prototype
// etc...

// .toString() Custom behavior with Symbol.toStringTag
// The behavior of Object toString can be customized
// using a special object property Symbol.toStringTag.

const payroll = {
  [Symbol.toStringTag]: "Payroll"
};

console.log(payroll.toString()); // [object Payroll]
