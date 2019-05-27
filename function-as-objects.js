// Function object

// “name” property
function hello() {
  return "hello";
}

console.log(hello.name); // hello

// “length” property : number of arguments
function bye(a, b, ...rest) {
  return "bye";
}

console.log(bye.length); // 2, rest parameters are not counted

// Custom properties
function thanks() {
  thanks.counter++;
  return "thanks";
}

thanks.counter = 0;
thanks();
thanks();
console.log(thanks.counter); // 2, rest parameters are not counted

// Named Function Expression

// let goodMorning = function(name) {
//   if (name) {
//     console.log(`Hello, ${name}`);
//   } else {
//     goodMorning("Unknown");
//   }
// };

// let gm = goodMorning;
// goodMorning = null;
// gm(); // ERROR _goodMorning is not a function

let goodMorning = function func(name) {
  if (name) {
    console.log(`Hello, ${name}`);
  } else {
    func("Unknown");
  }
};

let gm = goodMorning;
goodMorning = null;
gm(); // Hello, Unknown, still working
