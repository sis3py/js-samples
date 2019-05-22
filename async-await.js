// 1 - Basic sample
async function getAsyncNumber1() {
    return new Promise(resolve => {
      setTimeout(() => resolve(1), 100)
    });
}

async function getAsyncNumber2() {
  return new Promise(resolve => {
    setTimeout(() => resolve(2), 100)
  });
}

async function sumNumber() {
  const number1 = await getAsyncNumber1();
  const number2 = await getAsyncNumber2();
  const number3 = await 3;
  console.log(number1 + number2 + number3);
}

sumNumber();

/* 
OUTPUT :
6
*/

// 2 - Error handling using async / await
async function getAsyncNumber1WithError() {
  return new Promise((resolve, reject) => {
    setTimeout(() => reject('Database error'), 100)
  });
}

async function sumNumberWihErrorHandling() {
  try {
    const number1 = await getAsyncNumber1WithError();
    const number2 = 2;
    console.log(number1 + number2);
  } catch (e) {
    console.log('Error', e);
  }
}

sumNumberWihErrorHandling();
 
/* 
OUTPUT :
Error Database error 
*/