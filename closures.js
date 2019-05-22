// 1 - Solving scope issues

// Without closure
var result = [];
 
for (var i = 0; i < 5; i++) {
  result[i] = function () {
    console.log(i);
  };
}

result[0]();
result[1]();
result[2]();
result[3]();
result[4]();

/*
OUTPUT :
5
5
5
5
5 
*/

// With Closure
var result = [];
 
for (var i = 0; i < 5; i++) {
  result[i] = (function(x) {
    return function() {
      console.log(x);
    }
  })(i);
}

result[0]();
result[1]();
result[2]();
result[3]();
result[4]();

/*
OUTPUT :
0
1
2
3
4 
*/

// 2 - Keeping variable private 
function buildPassword() {
  const password = 'wlofj239*'; // private
  return {
    isPasswordCorrect: function(guess) {
      return guess === password;
    }
  }
}

const password = buildPassword();
const try1 = password.isPasswordCorrect('eiew65we?');
const try2 = password.isPasswordCorrect('wlofj239*');

console.log(password.password); 
console.log(try1);
console.log(try2);

/*
OUTPUT :
undefined
false
true
*/

function buildIncrementor() {
  var counter = 0;
  return function() {
      return counter+=1;
  }
}

const increment = buildIncrementor();
console.log(increment());
console.log(increment());
console.log(increment());
console.log(increment());

/*
OUTPUT :
1
2
3
4
*/