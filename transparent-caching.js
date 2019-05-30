// Decorators and forwarding

// Transparent caching
// Given a CPU-heavy pure function func(x)
// We want to cache the results for different x
// to avoid spending extra-time on recalculations

// A hash function will be needed to produce keys
function hash() {
  // Create a hash from a list of arguments by joining them
  return [].join.call(arguments); // Method borrowing : borrow the method from array [].join
}

// This is the caching decorator that will return a wrapper above the given function
// This wrapper will add the caching feature
function cachingDecorator(func, hash) {
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

module.heavy = cachingDecorator(module.heavy, hash);
heavy = cachingDecorator(heavy, hash);

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
