// .func.call(context, arg1, …argN) / .func.apply(context, argsArray)

// .func.call call a function explicitly setting this + arguments
// .func.apply call a function explicitly setting this + arguments as array-like

function thanks() {
  console.log(`Thanks ${this.firstname} ${this.lastname}`);
}

// thanks(); // TypeError: Cannot read property 'firstname' of undefined
thanks.call({ firstname: "John", lastname: "Doe" }); // Thanks John Doe
thanks.apply({ firstname: "John", lastname: "Doe" }); // Thanks John Doe

// With additional arguments
function saySomething(something) {
  console.log(`${something} ${this.firstname} ${this.lastname}`);
}
saySomething.call({ firstname: "John", lastname: "Doe" }, "Hi"); // Hi John Doe
saySomething.apply({ firstname: "John", lastname: "Doe" }, ["Hi"]); // Hi John Doe

// Constructor chaining
function Product(name, price) {
  this.name = name;
  this.price = price;
}

function Book(name, price) {
  Product.call(this, name, price); // Call and reuse Product constructor using  func.call()
  this.category = "book";
}

function Game(name, price) {
  Product.apply(this, [name, price]); // Call and reuse Product constructor using func.apply()
  this.category = "game";
}

const harryPotter = new Book("Harry Potter", 9);
const superMario = new Game("Super Mario", 60);
console.log(harryPotter);
console.log(superMario);

/* 

OUTPUT:
{
  name: "Harry Potter"
  price: 9
  category: "book"
  <constructor>: "Book"
}

{
  name: "Super Mario"
  price: 60
  category: "game"
  <constructor>: "Game"
}
*/

// func.call + spread operator
const args = [1, 2, 3];

// func.call() with args array as list with spread operator is same as func.apply() with minor differences :
func.call(context, ...args); // pass iterable args as the list to call
func.apply(context, args); // pass array-like args

// NB :
// Where we expect an iterable, call works, where we expect an array-like, apply works.
// If args is both iterable and array-like, like a real array, then we technically could use any of them,
// but apply is faster, because it’s a single operation and better optimized by the engine.

// Call forwarding using func.apply()
// // The wrapper passes everything it gets: the context this and arguments to original function and returns back its result
const wrapper = function() {
  return original.apply(this, arguments);
};
