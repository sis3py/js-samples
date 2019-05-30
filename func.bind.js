// Functions binding

// func.bind(context, ...args)
//  returns a “bound variant” of function func
// that fixes the context this and first arguments if given.

let user = {
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
