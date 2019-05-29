// setTimeout and setInterval

// .setTimeout(function, code, arg1, ...argN)
function thanks(firstname, lastname) {
  if (firstname && lastname) {
    console.log(`Thanks ${firstname} ${lastname}`);
  } else {
    console.log("Thanks");
  }
}

setTimeout(thanks, 1000); // Thanks
setTimeout(thanks, 1000, "John", "Doe"); // Thanks John Doe
const timeoutTimerId = setTimeout(thanks, 1000);
clearTimeout(timeoutTimerId); // Cancel the last setTimeout

// .setInterval(function, code, arg1, ...argN)
function goodbye(firstname, lastname) {
  if (firstname && lastname) {
    console.log(`Goodbye ${firstname} ${lastname}`);
  } else {
    console.log("Goodbye");
  }
}

setInterval(goodbye, 1000); // Goodbye
setInterval(goodbye, 1000, "John", "Doe"); // Goodbye John Doe
const intervalTimerId = setInterval(goodbye, 1000);
clearInterval(intervalTimerId); // Cancel the last setInterval

// Recursive setTimeout
// setTimeout guarantees a delay between the executions, setInterval – does not

// Instead of:
// setInterval(function hello() {
//   console.log('hello');
// }, 2000);

let recursiveTimeOutTimerId = setTimeout(function hello() {
  console.log("hello");
  recursiveTimeOutTimerId = setTimeout(hello, 2000);
}, 2000);

// setTimeout(func) (or setTimeout(func, 0))
// This schedules the execution of func as soon as possible.
// Scheduler will invoke it only after the current code is complete.

setTimeout(() => console.log("I'll be last"));
console.log("I'll be first");

/* 

OUTPUT:

I'll be first 
I'll be last 

*/

// Splitting heavy CPU tasks

// - This is an heavy job
let i = 0;

const start = Date.now();

function count() {
  for (let j = 0; j < 1e9; j++) {
    i++;
  }

  console.log("Done in " + (Date.now() - start) + "ms");
}

count();

// - Rewrite it with setTimeout optimizations, prevent stack blocking

let i = 0;

const start = Date.now();

function count() {
  if (i < 1e9 - 1e6) {
    setTimeout(count);
  }

  do {
    i++;
    console.log(`${i}% progression...`); // We can also display progress status and update the UI
  } while (i % 1e6 != 0);

  if (i == 1e9) {
    console.log("Done in " + (Date.now() - start) + "ms");
  }
}

count();
