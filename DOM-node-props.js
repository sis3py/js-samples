// Node properties: type, tag and contents
/* 
<!DOCTYPE html>
<html>
  <head>
    <title>Test</title>
    <meta charset="UTF-8" />
  </head>

  <body>
    Hi
    <div id="app"></div>
    <div id="content"></div>
    <script src="src/index.js"></script>
  </body>
</html>
*/

// - EventTarget – is the root “abstract” class. Objects of that class are never created. It serves as a base,
// so that all DOM nodes support so-called “events”

// - Node – is also an “abstract” class, serving as a base for DOM nodes.
// It provides the core tree functionality: parentNode, nextSibling, childNodes and so on (they are getters). Objects of Node class are never created.

// - Element – is a base class for DOM elements. It provides element-level navigation
// like nextElementSibling, children and searching methods
// like getElementsByTagName, querySelector.

// - HTMLElement – is the basic class for all HTML elements.
// It is inherited by various HTML elements: HTMLInputElement (<input>), HTMLAnchorElement (<a>), ...

// Inheritance :
// Object <- EventTarget <- Node <- Element <- HTMLElement <- [HTMLInputElement, HTMLAnchorElement, ...]

console.log(document.body.toString()); // [object HTMLBodyElement]
console.log(document.body instanceof HTMLBodyElement); // true

// nodeType property : old-fashioned way to get the “type” of a DOM node (instanceof is better)
// - 1 for element nodes
// - 3 for text nodes
// - 9 for the document object

console.log(document.body.nodeType); // 1

// Tag: nodeName (for elements nodes) and tagName (all nodes)
console.log(document.getElementById("app").tagName); // DIV
console.log(document.body.nodeName); // BODY

// innerHTML: the contents : allows to get the HTML inside the element as a string.
console.log(document.getElementById("content").innerHTML); // ""

// Modifications are possible : one of most powerful ways to change the page
document.getElementById("content").innerHTML = "<p>Hello</p>";
console.log(document.getElementById("content")); // <div id="content"><p>Hello</p></div>

// /!\ If innerHTML inserts a <script> tag into the document – it becomes a part of HTML, but doesn’t execute.

// /!\ “innerHTML+=” does a full overwrite : images are reloaded, mouse selection deleted, ...
document.getElementById("content").innerHTML += "<p>Bye bye</p>";
console.log(document.getElementById("content")); // <div id="content"><p>Hello</p><p>Bye bye</p></div>

// outerHTML: full HTML of the element
console.log(document.getElementById("content").outerHTML); // <div id="content"><p>Hello</p><p>Bye bye</p></div>

// /!\ unlike innerHTML, writing to outerHTML does not change the element.
// Instead, it replaces it as a whole in the outer context.
const content = document.getElementById("content");
content.outerHTML = '<p id="content">New content</p>';
console.log(content); // <div id="content"><p>Hello</p><p>Bye bye</p></div>, element not updated
console.log(document.getElementById("content").outerHTML); // <p id="content">New content</p> updated after reselection

// nodeValue/data: text node content
console.log(document.body.firstChild.data); // Hi

// textContent: provides access to the text inside an element¨
// Safer text update than innerHTML
console.log(document.getElementById("content").textContent); // New content
document.getElementById("content").textContent = "New safe content";
console.log(document.getElementById("content").textContent); // New safe content

// “hidden” property : specifies whether the element is visible or not.
// works the same as style="display:none". But it’s shorter to write.
document.getElementById("content").hidden = true;

// Other properties :
// - value : the value for <input>, <select> and <textarea>¨
// - href – the “href” for <a href="...">
// - id – the value of “id” attribute, for all elements
// - ...