// Numbers

// Short syntax
const billionShort = 1e9;  // 1 billion short syntax
const billionLong = 1000000000; // 1 billion
console.log(billionShort === billionLong); // True

const microsecondShort = 1e-6; // 1 microsecond short syntax
const microsecondLong = 0.000001; // 1 microsecond
console.log(microsecondShort === microsecondLong); // True

// Get a numer with the given base using .toString(base)
const num = 45781542124;
console.log(num.toString(16));  // Hexa (hex colors, character encodings, ...)
console.log(num.toString(2));   // Binary (debugging bitwise operations, ...)
console.log(num.toString(36)); // Used to short numbers (URl, ...)

/* 

OUTPUT: 

aa8cae4ec 
101010101000110010101110010011101100
l155bzg 

*/

// console.log(123.toString()) Error
console.log((123).toString()); // 123
console.log(123..toString()); // 123

// Rounding

// Math.floor : Round down
const roundDown = Math.floor(1.4); // Round down a number
console.log(roundDown); // 1

// Math.ceil : Round up
const roundUp = Math.ceil(1.4); // Round up a number
console.log(roundUp); // 2

// Math.round : nearest integer
const roundNearest1 = Math.round(1.4); // Round a number to the nearest integer
const roundNearest2 = Math.round(1.6);
console.log(roundNearest1); // 1
console.log(roundNearest2); // 2

// Math.trunc : remove decimal part
const trunc = Math.trunc(1.4); // Trunc a number
console.log(trunc); // 1

// Round the number to n-th digit after the decimal

// Using multiply / divide
const roundDownNthDigit = Math.floor(1.4575 * 100) / 100; // 100 if 2 digits, 1000 for 3, ...
const roundUpNthDigit = Math.ceil(1.4575 * 100) / 100;
console.log(roundDownNthDigit) // 1.45
console.log(roundUpNthDigit) // 1.46

// Using .toFixed() (behave like Math.round())
const numberFixed = 1.4575.toFixed(2); // Fix the number of digit and round it
console.log(numberFixed); // "1.46" String !
console.log(+numberFixed); // 1.46 Number

// Imprecision due to IEEE-754 64 bits binary storage
console.log(0.1.toFixed(20)); // "0.10000000000000000555"
console.log(0.1 + 0.2); // 0.30000000000000004
console.log(9999999999999999) // 10000000000000000 Loss of precision

// Fix imprecision using rounding
console.log((0.1 + 0.2).toFixed(2)); // 0.30 

// NaN
console.log(NaN === NaN); // false, NaN equals nothing including itself

// isNaN(n) converts n to number and test if NanN
console.log(isNaN(NaN)); // true
console.log(isNaN("string")); // true

// isFinite(n) converts n to number and returns true if not NaN/Infinity/-Infinity
console.log(isFinite("78")); // true
console.log(isFinite("string")); // false
console.log(isFinite(Infinity)); // false
 
// parseInt, parseFloat read a number from a string until they can’t
console.log(parseInt('200px')); // 200
console.log(parseFloat('5.2em')); // 5.2
console.log(parseInt('4.3')); // 4
console.log(parseFloat('1.0.5')); // 1
console.log(parseInt('z102')); // NaN, z prevent from parsing the number

// parseInt with radix as 2nd argument
console.log(parseInt("aa8cae4ec ", 16)); // 45781542124

// Math.random() returns a random number from 0 to 1
console.log(Math.random()); // Any random number

// Math.max(a, b, c...) Returns the greatest from the arbitrary number of arguments
console.log(Math.max(1, -5, 10, 105, 5.65)) // 105

// Math.min(a, b, c...) returns the smallest from the arbitrary number of arguments
console.log(Math.min(1, -5, 10, 105, 5.65)) // -5