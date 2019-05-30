// Currying
// transformation of functions that translates a function
// from callable as f(a, b, c) into callable as f(a)(b)(c)

// Curry helper, handling 2 arguments functions
// f(a, b) =>  f(a)(b)
function curry(func) {
  return function(a) {
    return function(b) {
      return func(a, b);
    };
  };
}
function sum(a, b) {
  return a + b;
}

const curriedSum = curry(sum);
console.log(curriedSum(1)(2)); // 3
console.log(curriedSum(1)(3)); // 4

// Curry helper handling curried / non curried calls
function betterCurry(func) {
  return function curried(...args) {
    if (args.length >= func.length) {
      return func.apply(this, args);
    } else {
      return function(...otherArgs) {
        return curried.apply(this, args.concat(otherArgs));
      };
    }
  };
}

const advancedCurriedSum = betterCurry(sum);
console.log(advancedCurriedSum(1)(2)); // 3, using curried version
console.log(advancedCurriedSum(1, 2)); // 3, using non curried version
