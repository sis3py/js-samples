// Error handling

// Try ... Catch

try {
  console.log(test);
} catch (error) {
  const { name, message, stack } = error; // Error object got 3 properties
  console.log(name); // ReferenceError
  console.log(message); // test is not defined
  console.log(stack); // ReferenceError: test is not defined at evaluate ...
}

// /!\ try..catch works synchronously
// Because the function itself is executed later, when the engine has already left the try..catch
try {
  setTimeout(test, 1000); // Error !
} catch (error) {
  // Catch block not triggered
  console.log(error);
}

// To catch an exception inside a scheduled function, try..catch must be inside that function:
setTimeout(() => {
  try {
    test();
  } catch (error) {
    console.log(error); // // ReferenceError: test is not defined
  }
}, 1000);

// Optional catch binding
try {
  test();
} catch {
  // No error object
}

// “Throw” operator
try {
  throw new Error("An error occured");
} catch ({ name, message }) {
  console.log(name); // Error
  console.log(message); // An error occured
}

try {
  throw new SyntaxError("A syntax error occured");
} catch ({ name, message }) {
  console.log(name); // SyntaxError
  console.log(message); // A syntax error occured
}

// Rethrowing
// Catch should only process errors that it knows and “rethrow” all others.

function parseUser(json) {
  try {
    const user = JSON.parse(json);

    // Properly handle the syntax errors
    if (!user.firstname || !user.lastname) {
      throw new SyntaxError(
        "Incomplete JSON data : firstname and lastname are needed"
      );
    }

    test(); // This line triggers an error (test is undefined)

    console.log(user.name);
  } catch (error) {
    if (error instanceof SyntaxError) {
      console.log("JSON parsing error: " + error.message); // JSON parsing error: Incomplete JSON data : missing lastname
    } else {
      // For all non syntax errors, simply rethrow the error
      throw error;
    }
  }
}

const incompleteJson = '{ "firstname": "John" }';
const completeJson = '{ "firstname": "John", "lastname": "Doe" }';

parseUser(incompleteJson); // JSON parsing error: Incomplete JSON data : firstname and lastname are needed
// parseUser(completeJson); // ReferenceError: test is not defined

// try…catch…finally
// Finally block always runs :

// ...after an error catch
try {
  test();
} catch ({ name, message }) {
  console.log(`Error : ${name} : ${message}`); // Error : ReferenceError : test is not defined
} finally {
  console.log(`I will be always displayed`); // I will be always displayed
}

// ...without error catch
try {
  let i = 0;
} catch ({ name, message }) {
  // Catch block not triggered
  console.log(`Error : ${name} : ${message}`);
} finally {
  console.log(`I will be always displayed`); // I will be always displayed
}

// ...after a return
function run() {
  try {
    return true;
  } catch ({ name, message }) {
    // Catch block not triggered
    console.log(`Error : ${name} : ${message}`);
  } finally {
    console.log(`I will be always displayed even after return`); // I will be always displayed
  }
}

run(); // I will be always displayed even after return

// try..finally
// Make sure a started process will be finalized.

function func() {
  // start doing something that needs completion (like measurements)
  try {
    // ...
  } finally {
    // complete that thing even if all dies
  }
}

// Global catch
// using window.onerror = (message, url, line, col, error) => {...}
// - message : the error message
// - url : URL of the script where error happened
// - line: line numbers where error happened
// - col : column numbers where error happened
// - error: error object
window.onerror = (message, url, line, col, error) => {
  console.log(`${message}\n At ${line}:${col} of ${url}`);
};

// Custom errors

class CustomError extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name; // automatically handle the name
  }
}
class ValidationError extends CustomError {}

const completeMessageJson =
  '{ "id": "1", "title": "Title", "body": "Message" }';
const incompleteMessageJson = '{ "id": "1", "title": "Title" }';
const incorrectlyFormatedMessageJson = "{ ** }";

function parseMessage(json) {
  const message = JSON.parse(json);

  if (!message.id || !message.title || !message.body) {
    throw new ValidationError(
      "Incomplete JSON data : id, firstname and lastname are needed"
    );
  }

  return message;
}

function getMessage(json) {
  try {
    const message = parseMessage(json);
    return message;
  } catch (error) {
    if (error instanceof ValidationError) {
      console.log(`Validation Error (${error.message})`);
    } else if (error instanceof SyntaxError) {
      console.log(`Syntax Error (${error.message})`);
    } else {
      throw error;
    }
  }
}

const message1 = getMessage(completeMessageJson); // No errors
const message2 = getMessage(incompleteMessageJson); // Validation Error (Incomplete JSON data : id, firstname and lastname are needed)
const message3 = getMessage(incorrectlyFormatedMessageJson); // Syntax Error (Unexpected token * in JSON at position 2)

// Wrapping exceptions
// Handles low-level exceptions and makes a higher-level object to report about the errors

class ReadError extends CustomError {
  constructor(message, cause) {
    super(message);
    this.cause = cause;
  }
}

function validateMessage(message) {
  if (!message.id || !message.title || !message.body) {
    throw new ValidationError(
      "Incomplete JSON data : id, firstname and lastname are needed"
    );
  }
}

function parseMessageEnhanced(json) {
  let message;

  try {
    message = JSON.parse(json);
  } catch (error) {
    if (error instanceof SyntaxError) {
      throw new ReadError("Syntax Error", error);
    } else {
      throw error;
    }
  }

  try {
    validateUser(message);
  } catch (error) {
    if (error instanceof ValidationError) {
      throw new ReadError("Validation Error", error);
    } else {
      throw error;
    }
  }
}

try {
  parseMessageEnhanced("{**}");
} catch (error) {
  if (error instanceof ReadError) {
    console.log(`Error : ${error.name} : ${error.message}`); // Error : ReadError : Syntax Error
    console.log(`Cause Error : ${error.cause.name} : ${error.cause.message}`); // Cause Error : SyntaxError : Unexpected token * in JSON at position 1
  } else {
    throw error;
  }
}
