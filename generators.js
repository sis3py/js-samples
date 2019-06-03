import { write } from "fs";

// Generators
// Return (“yield”) multiple values, possibly an infinite number of values, one after another.

function* generateSequence() {
  yield 1;
  yield 2;
  return 3;
}

// Get the generator object, a “frozen function call”
const generator = generateSequence();

const one = generator.next();
const two = generator.next();
const three = generator.next();
const four = generator.next();
console.log(one); // {value: 1, done: false}
console.log(two); // {value: 2, done: false}
console.log(three); // {value: 3, done: false}
console.log(four); // {value: undefined, done: false}

// /!\ Generator are not rollbackable, a new one must be created
const generator2 = generateSequence();

for (let value of generator2) {
  console.log(value); // 1, 2
}

// /!\ 3 is not returned because for ... of ignores the return

// Generators are iterable, all related functionality can be call
const spreaded = [0, ...generateSequence()]; // e.g. the spread operator
console.log(spreaded);
[0, 1, 2];

// Using generators instead of iterables
function* generateRange(start, end) {
  for (let i = start; i <= end; i++) {
    yield i;
  }
}

const rangeSequence = [...generateRange(1, 5)];
console.log(rangeSequence); // [1, 2, 3, 4, 5]

// With a custom range object
const range = {
  from: 1,
  to: 5,

  *[Symbol.iterator]() {
    // shorthand for [Symbol.iterator]: function*()
    for (let value = this.from; value <= this.to; value++) {
      yield value;
    }
  }
};

console.log([...range]); // [1, 2, 3, 4, 5]

// Generator composition using yield*
// Allows to transparently “embed” generators in each other.

// Generate a sequence of:
// - digits 0..9 (character codes 48…57),
// - followed by alphabet letters a..z (character codes 65…90)
// - followed by uppercased letters A..Z (character codes 97…122)

function* generateAlphaNumericSequence() {
  // 0..9
  yield* generateRange(48, 57); // yield* delegates the execution to another generator
  // idem : for (let i = 48; i <= 57; i++) yield i;

  // A..Z
  yield* generateRange(65, 90);

  // a..z
  yield* generateRange(97, 122);
}

let alphanumericSequence = "";

for (let code of generateAlphaNumericSequence()) {
  alphanumericSequence += String.fromCharCode(code);
}

console.log(alphanumericSequence); // 0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz

// Passing Arguments to the next() Method

function* generatorArgsPassedToNextFunction(a) {
  console.log(a);
  const b = 1 + 2 * (yield a + 5);
  console.log(b);
  const c = yield 3 * b;
  console.log(c);
  return a + b + c;
}

const generatorArgsPassedToNext = generatorArgsPassedToNextFunction(100);

const val1 = generatorArgsPassedToNext.next(5); // 100 (a = 100)
console.log(val1); // {value: 105, done: false} (value = yield(100 + 5) = 105)

const val2 = generatorArgsPassedToNext.next(10); // 21 (b = 1 + 2 * 10 = 21)
console.log(val2); // {value: 63, done: false} (value = yield(3 * 21) = 63)

const val3 = generatorArgsPassedToNext.next(15); // 15 (c = 15)
console.log(val3); // {value: 136, done: true} (value = a + b + c = 100 + 21 + 15 = 136)

// Passing Yield as an Argument of a Function

function* generatorYieldPassedAsFunctionArgsFunction() {
  yield;
  saySomething(yield "Hello");
}

function saySomething(something) {
  console.log(`I want to say : ${something}`);
}

const generatorYieldPassedAsFunctionArgs = generatorYieldPassedAsFunctionArgsFunction();

const val4 = generatorYieldPassedAsFunctionArgs.next();
console.log(val4); // {value: undefined, done: false}

const val5 = generatorYieldPassedAsFunctionArgs.next();
console.log(val5); // {value: "Hello", done: false}

const val6 = generatorYieldPassedAsFunctionArgs.next(); // I want to say : undefined
console.log(val6); // {value: undefined, done: true}

// Yield with a Function Call

function* fetchUser() {
  const user = yield getUser();
  console.log(user);
}

function getUser() {
  return { firstname: "John", lastname: "Doe" };
}

const fetchUserGenerator = fetchUser();
const val7 = fetchUserGenerator.next().value;
console.log(val7); // {firstname: "John", lastname: "Doe"}

const val8 = fetchUserGenerator.next(); // undefined
console.log(val8); // {value: undefined, done: true}

// Yield with Promises
function* fetchItem() {
  const item = yield getItem();
}

function getItem() {
  return new Promise(resolve => {
    setTimeout(() => resolve({ id: 1, label: "Item 1" }), 1000);
  });
}

const fetchItemGenerator = fetchItem();
fetchItemGenerator.next().value.then(item => console.log(item)); // {id: 1, label: "Item 1"}

// Async generators

async function* generateAsyncSequence(start, end) {
  for (let i = start; i <= end; i++) {
    await new Promise(resolve => setTimeout(resolve, 1000));
    yield i;
  }
}

(async () => {
  let asyncGenerator = generateAsyncSequence(1, 5);
  for await (let value of asyncGenerator) {
    console.log(value); // 1, then 2, then 3, then 4, then 5
  }

  console.log(await asyncGenerator.next()); // {value: undefined, done: true}
})();

/* 

OUTPUT: 

1
(1 second after)
2
(1 second after)
3
(1 second after)
4
(1 second after)
5
*/

// Iterables via async generators
const asyncGeneratorRange = {
  from: 1,
  to: 5,

  async *[Symbol.asyncIterator]() {
    for (let value = this.from; value <= this.to; value++) {
      // Simulate an async call
      await new Promise(resolve => setTimeout(resolve, 1000));
      yield value;
    }
  }
};

(async () => {
  for await (let value of asyncGeneratorRange) {
    console.log(value);
  }
})();

/* 

OUTPUT: 

1
(1 second after)
2
(1 second after)
3
(1 second after)
4
(1 second after)
5
*/
