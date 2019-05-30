// Functions binding

// func.bind(context, ...args)
//  returns a “bound variant” of function func
// that fixes the context this and first arguments if given.

const user = {
  firstName: "John",
  sayHi(lastname) {
    console.log(`Hello, ${this.firstName} ${lastname ? lastname : ""}`);
  }
};

// Without bindind :
setTimeout(user.sayHi, 1000); // Hello, undefined, this is lost

// With binding to user
setTimeout(user.sayHi.bind(user), 1000); // Hello, John
setTimeout(user.sayHi.bind(user, "Doe"), 1000); // Hello, John Doe

// Alternative using wrapper function
setTimeout(function() {
  user.sayHi();
}, 1000); // Hello, John
setTimeout(function() {
  user.sayHi("Doe");
}, 1000); // Hello, John Doe

// Alternative using wrapper arrow function
setTimeout(() => user.sayHi(), 1000); // Hello, John
setTimeout(() => user.sayHi("Doe"), 1000); // Hello, John Doe

// Partial application using .bind()
// Create a new function by fixing some parameters of the existing one.

function multiply(a, b) {
  return a * b;
}

const double = multiply.bind(null, 2); // Partial application using .bind()
console.log(double(2)); // 4
console.log(double(7)); // 14
console.log(double(45)); // 90

// If we dan't want to provide context (this ,null) each time
// We can create a partial function for argument binding only
function partial(func, ...boundArgs) {
  return function(...args) {
    return func.call(this, ...boundArgs, ...args);
  };
}

// No more .bind() to handle
const triple = partial(multiply, 3); // Partial application using custom .partial()
console.log(triple(2)); // 6
console.log(triple(7)); // 21
console.log(triple(45)); // 135
