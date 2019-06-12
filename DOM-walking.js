// Walking the DOM
/*
<!DOCTYPE html>
<html>
  <head>
    <title>Title</title>
    <meta charset="UTF-8" />
  </head>

  <body>
    <div id="main-container">
      <div id="app"></div>
      <p>Hello</p>
    </div>
    <script src="src/index.js"></script>
  </body>
</html>
*/

// <html>
const html = document.documentElement;
console.log(html); // <html> ... </html>

// <body>
const body = document.body;
console.log(body); //<body> ... </body>

// <head>
const head = document.head;
console.log(head); //<head> ... </head>

// 1) Working with nodes

// .childNodes : DOM Collections
// - DOM collections are read-only
// - DOM collections are live (synchronised with real state)
// - Array-like : Array.from() can be used to call array methods
const mainContainerChildNotes = document.getElementById("main-container")
  .childNodes;
for (const node of mainContainerChildNotes) {
  console.log(node);
}

/*

OUTPUT :

Text {constructor: Object}
<div id="app"></div>
Text {constructor: Object}
<p>Hello</p>
Text {constructor: Object}

*/

// .firstChild : get the first node among all the node children
const mainContainerFirstChild = document.getElementById("main-container")
  .firstChild;
console.log(mainContainerFirstChild); // Text {constructor: Object}

// .lastChild: get the last node among all the node children
const mainContainerLastChild = document.getElementById("main-container")
  .lastChild;
console.log(mainContainerLastChild); // Text {constructor: Object}

// .parentNode : get the parent node of a node
const bodyParent = document.body.parentNode;
console.log(bodyParent); // <html> … </html>

// .nextSibling : get the next node that is children of the same parent
const headNextSibling = document.head.nextSibling;
console.log(headNextSibling); // Text {constructor: Object}

// .previousSibling : get the previous node that is children of the same parent
const bodyPreviousSibling = document.body.previousSibling;
console.log(bodyPreviousSibling); // Text {constructor: Object}

// 2) Working with elements
// This is better that working with nodes because only elements nodes are relevant
// It avoids getting text nodes, comments, ...

// .children : DOM Collections
const mainContainerChildren = document.getElementById("main-container")
  .children;
for (const node of mainContainerChildren) {
  console.log(node);
}

/*

OUTPUT :

<div id="app"></div>
<p>Hello</p>

*/

// .firstElementChild : get the first element  among all the element children
const mainContainerFirstElementChild = document.getElementById("main-container")
  .firstElementChild;
console.log(mainContainerFirstElementChild); // <div id="app"></div>

// .lastElementChild : get the last element among all the element children
const mainContainerLastElementChild = document.getElementById("main-container")
  .lastElementChild;
console.log(mainContainerLastElementChild); // <div id="app"></div>

// .parentElement : get the parent element of a node
const parentElement = document.body.parentElement;
console.log(parentElement); // <html> … </html>

// .nextElementSibling : get the next element that is children of the same parent
const headNextElementSibling = document.head.nextElementSibling;
console.log(headNextElementSibling); // <body> … </body>

// .previousElementSibling : get the previous element that is children of the same parent
const bodyPreviousElementSibling = document.body.previousElementSibling;
console.log(bodyPreviousElementSibling); // <head> … </head>

// Certain types of DOM elements may provide additional properties,
// specific to their type, for convenience.
// Some examples with <table> :
// - table.rows – the collection of <tr> elements of the table.
// - tbody.rows – the collection of <tr> inside.
// - tr.cells – the collection of <td> and <th> cells inside the given <tr>.
// - td.cellIndex – the number of the cell inside the enclosing <tr>.
// - ...
