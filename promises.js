// 1 - Function returning promise
function getPromise(status) {
  return new Promise((resolve, reject) => {
    if(status) {
      setTimeout(() => { resolve(200); }, 1000)
    }
    else {
      setTimeout(() => { reject(500); }, 1000)
    }
  });
}

// Call it with success
getPromise(true).then((result) => console.log(`success with http code : ${result}`))
               .catch((result) => console.log(`error with http code : ${result}`))
               .finally(() => console.log("I'm always printed"));

/* 
OUTPUT :
success with http code : 200 
I'm always printed 
*/

// Call it with fail
getPromise(false).then((result) => console.log(`success with http code : ${result}`))
               .catch((result) => console.log(`error with http code : ${result}`))
               .finally(() => console.log("I'm always printed"));
/*
OUTPUT :
error with http code : 500 
I'm always printed 
*/

// 2 - Function returning promise even if not all inner tasks are async

// Simulate an always successful API call
function fetchApi(route) {
  return new Promise(resolve => {
    setTimeout(() => { resolve({id: 1, fullname: 'User 1'}); }, 2000)
  });
}

// Simulate a store
const customers = {};

// This function always return a promise, even when using the cache
function getCustomer(customerId) {
  if(customers[customerId]) {
      return Promise.resolve(customers[customerId]);
  }
  else {
    return fetchApi(`/customer/${customerId}`);
  }
}

// Customer from API
getCustomer(1).then((customer) => console.log(customer.fullname));

/*
OUTPUT :
User 1 
*/

// Customer from Cache
getCustomer(1).then((customer) => console.log(customer.fullname));

/*
OUTPUT :
User 1 
*/

// 3 - Promise.all()
// Takes an array of promises and fires one callback once they are all resolved

const p1 = new Promise(resolve => { 
	setTimeout(() => { resolve('Success 1'); }, 100);
});

const p2 = new Promise(resolve => { 
	setTimeout(() => { resolve('Success 2'); }, 200);
});

const p3 = new Promise((resolve, reject) => { 
	setTimeout(() => { reject('Error 1'); }, 300);
});

// Call successful promises
Promise.all([p1, p2]).then((results) => {
  // This is called
	console.log(results);
})
.catch((error) => {
	console.log(error);
});

/*
OUTPUT :
["Success 1", "Success 2"] 
*/

// Call 2 successful promise and 1 error
Promise.all([p1, p2, p3]).then((results) => {
	console.log(results);
})
.catch((error) => {
  // This is called
	console.log(error);
});

/*
OUTPUT :
Error 1 
*/

// 4 - Promise.race()
// Triggers as soon as any promise in the array is resolved or rejected
const p4 = new Promise(resolve => { 
	setTimeout(() => { resolve('Success 1'); }, 100);
});

const p5 = new Promise(resolve => { 
	setTimeout(() => { resolve('Success 2'); }, 200);
});

Promise.race([p4, p5]).then((results) => {
  // This is called just after p4 resolution because p4 is faster than p5
	console.log(results);
})
.catch((error) => {
	console.log(error);
});

/* 
OUTPUT :
Success 1
*/