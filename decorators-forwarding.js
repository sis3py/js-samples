// Decorators and forwarding

// Memoize
// Given a CPU-heavy pure function func(x)
// We want to cache the results for different x
// to avoid spending extra-time on recalculations

// A hash function will be needed to produce keys
function hash() {
  // Create a hash from a list of arguments by joining them
  return [].join.call(arguments); // Method borrowing : borrow the method from array [].join
}

// This is the memoize decorator that will return a wrapper above the given function
// This wrapper will add the memoize feature
function memoizeDecorator(func, hash) {
  const cache = new Map(); // This is the cache storage
  return function() {
    const key = hash(arguments); // Build the key
    if (cache.has(key)) {
      // Check if there is already a cache value for this key
      return cache.get(key); // Return the value from cache
    }

    // If the value has not already been cached, just call the given function
    const value = func.apply(this, arguments); // func.apply() allows to properly handle this

    cache.set(key, value); // Store the value and make it immediately available for future calls
    return value;
  };
}

// Sample 1 : simulate CPU-Heavy function
function heavy(number) {
  let result = 0;
  for (var i = Math.pow(number, 7); i >= 0; i--) {
    result += Math.atan(i) * Math.tan(i);
  }
  return result;
}

// Sample 2 : simulate CPU-Heavy method
const module = {
  heavy(number) {
    // Assume that this method is a CPU-heavy one
    return heavy(number);
  }
};

module.heavy = memoizeDecorator(module.heavy, hash);
heavy = memoizeDecorator(heavy, hash);

// First module.heavy(20) call, no cache yet
console.time("module.heavy() no cache");
module.heavy(20);
console.timeEnd("module.heavy() no cache");

// Second module.heavy(20) call, now we immediately get the result from cache
console.time("module.heavy() cache");
module.heavy(20);
console.timeEnd("module.heavy() cache");

// First heavy(20) call, no cache yet
console.time("heavy() no cache");
heavy(20);
console.timeEnd("heavy() no cache");

// Second heavy(20) call, now we immediately get the result from cache
console.time("heavy() cache");
heavy(20);
console.timeEnd("heavy() cache");

// Spy decorator
// Keep track of all the calls made to a given function

function spy(func) {
  function wrapper(...args) {
    wrapper.calls.push(args);
    return func.apply(this, arguments);
  }

  wrapper.calls = [];

  return wrapper;
}

function sum(a, b) {
  return a + b;
}

sum = spy(sum);
sum(1, 2);
sum(3, 4);
sum(5, 6);
console.log(sum.calls); // [[1, 2], [3, 4], [5, 6]]

// Delaying decorator
// Delays each call of a function by n milliseconds

function delay(func, n) {
  return function() {
    setTimeout(() => func.apply(this, arguments), n);
  };
}

function thinkBeforeTalk(thoughtOut) {
  console.log(thoughtOut);
}

thinkBeforeTalk = delay(thinkBeforeTalk, 1000);
thinkBeforeTalk("Brilliant idea"); // Brilliant idea, after 1 second

// Debounce decorator
// Guarantees that all other future calls of a function
// in the closest n milliseconds will be ignored.

function debounce(func, n) {
  let isCooldown = false;

  return function() {
    if (isCooldown) return;

    func.apply(this, arguments);

    isCooldown = true;

    setTimeout(() => (isCooldown = false), n);
  };
}

function dontSpamMe(message) {
  console.log(message);
}

dontSpamMe = debounce(dontSpamMe, 2000);
dontSpamMe("Hello"); // Hello
dontSpamMe("How are you ?"); // Nothing
dontSpamMe("Are you fine ?"); // Nothing
dontSpamMe("Please answer me !"); // Nothing
dontSpamMe("Ok goodbye"); // Nothing

// Throttle decorator
// idem debounce but if an ignored call is the last during the cooldown,
//  then it executes at the end of the delay.
function throttle(func, ms) {
  let isThrottled = false;
  let savedArgs;
  let savedThis;

  function wrapper() {
    if (isThrottled) {
      // If is currently throttled, store the context / args
      savedArgs = arguments;
      savedThis = this;
      return;
    }

    func.apply(this, arguments); // First call

    isThrottled = true;

    setTimeout(function() {
      isThrottled = false; // No longer throttled
      if (savedArgs) {
        wrapper.apply(savedThis, savedArgs); // Call the wrapper with the saved context / args
        savedArgs = null;
        savedThis = null;
      }
    }, ms);
  }

  return wrapper;
}

function dontSpamMeButAtLeastSayGoodbye(message) {
  console.log(message);
}

dontSpamMeButAtLeastSayGoodbye = throttle(dontSpamMeButAtLeastSayGoodbye, 2000);
dontSpamMeButAtLeastSayGoodbye("Hello"); // Hello
dontSpamMeButAtLeastSayGoodbye("How are you ?"); // Nothing
dontSpamMeButAtLeastSayGoodbye("Are you fine ?"); // Nothing
dontSpamMeButAtLeastSayGoodbye("Ok goodbye"); // Ok goodbye
