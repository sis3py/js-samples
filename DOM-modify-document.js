// DOM Modifying the document

/* 
<!DOCTYPE html>
<html>
  <head>
    <title>Test</title>
    <meta charset="UTF-8" />
  </head>

  <body>
    <div id="content"></div>
    <div id="app"></div>
    <script src="src/index.js"></script>
  </body>
</html>
*/

// Creates a new element with the given tag
const div = document.createElement("div");

// Creates a new text node with the given text
const textNode = document.createTextNode("Hello");

// parentElement.appendChild(node): appends node as the last child of parentElement
const span = document.createElement("span");
span.innerHTML = "Greeting";
const content = document.getElementById("content");
content.appendChild(span);
console.log(content); // <div id="content"><span>Greeting</span></div>

// parentElement.insertBefore(node, nextSibling) : inserts node before nextSibling into parentElement
const p = document.createElement("p");
p.innerHTML = "Thanks";
content.insertBefore(p, span);
console.log(content); // <div id="content"><p>Thanks</p><span>Greeting</span></div>

// parentElement.replaceChild(node, oldChild) : replaces oldChild with node among children of parentElement
const h1 = document.createElement("h1");
h1.innerHTML = "What";
content.replaceChild(h1, p);
console.log(content); // <div id="content"><h1>What</h1><span>Greeting</span></div>

// Modern methods : prepend/append/before/after

// node.append(...nodes or strings) – append nodes or strings at the end of node
content.innerHTML = "";
const last = document.createElement("span");
last.innerHTML = "last";
content.append(last);
console.log(content); // <div id="content"><span>last</span></div>

// node.prepend(...nodes or strings) – insert nodes or strings into the beginning of node
const first = document.createElement("span");
first.innerHTML = "first";
content.prepend(first);
console.log(content); // <div id="content"><span>first</span><span>last</span></div>

// node.before(...nodes or strings) –- insert nodes or strings before the node
const beforeLast = document.createElement("span");
beforeLast.innerHTML = "before last";
last.before(beforeLast);
console.log(content); // <div id="content"><span>first</span><span>before last</span><span>last</span></div>

// node.after(...nodes or strings) –- insert nodes or strings after the node
const afterFirst = document.createElement("span");
afterFirst.innerHTML = "after first";
first.after(afterFirst);
console.log(content); // <div id="content"><span>first</span><span>after first</span><span>before last</span><span>last</span></div>

// node.replaceWith(...nodes or strings) –- replaces node with the given nodes or strings.
const newLast = document.createElement("span");
newLast.innerHTML = "New last";
last.replaceWith(newLast);
console.log(content); // <div id="content"><span>first</span><span>after first</span><span>before last</span><span>New last</span></div>

// element.insertAdjacentHTML(where, html)
// where can be :
// - "beforebegin" – insert html before element
// - "afterbegin" – insert html into element, at the beginning
// - "beforeend" – insert html into element, at the end
// - "afterend" – insert html after element
content.innerHTML = "";
content.insertAdjacentHTML("beforebegin", "<span>Before element</span>");
content.insertAdjacentHTML(
  "afterbegin",
  "<span>Into element, at the beginning</span>"
);
content.insertAdjacentHTML(
  "beforeend",
  "<span>Into element, at the end</span>"
);
content.insertAdjacentHTML("afterend", "<span>After element</span>");
console.log(document.body);

/* 

<body>
  <span>Before element</span>
  <div id="content">
    <span>Into element, at the beginning</span>
    <span>Into element, at the end</span>
  </div>
  <span>After element</span>
  <div id="app"></div>
  <script src="src/index.js"></script>
</body>

*/

// element.insertAdjacentText(where, text)
// idem previous method but a string of text is inserted “as text” instead of HTML
content.innerHTML = "";
content.insertAdjacentText(
  "afterbegin",
  "<span>Into element, at the beginning</span>"
);
console.log(content);

/* 
<div id="content">
  TEXT <span>Into element, at the beginning</span> TEXT
</div>
*/

// element.insertAdjacentElement(where, elem)
// idem previous method ut inserts an element.
content.innerHTML = "";
const insertedElement = document.createElement("span");
insertedElement.innerHTML = "Test";
content.insertAdjacentElement("afterbegin", insertedElement);
console.log(content); // <div id="content"><span>Test</span></div>

// Cloning nodes: cloneNode

// element.cloneNode(true) creates a “deep” clone of the element
// with all attributes and subelements
content.innerHTML = "";
const toCloneDiv = document.createElement("div");
const toCloneDivChild = document.createElement("span");
toCloneDivChild.innerHTML = "Child";
toCloneDiv.append(toCloneDivChild);
content.append(toCloneDiv);

// Append the deeply cloned div after the existing div
const deepClonedDiv = toCloneDiv.cloneNode(true);
toCloneDiv.after(deepClonedDiv);

// Append the cloned div after the existing div
const clonedDiv = toCloneDiv.cloneNode(false);
toCloneDiv.after(clonedDiv);

console.log(content);

/* 

<div id="content">
  <div>
    <span>Child</span>
  </div>
  <div></div>
  <div>
    <span>Child</span>
  </div>
</div>

*/

// Removal methods

// parentElement.removeChild(node) removes node from parentElement (assuming it’s a child)
content.removeChild(clonedDiv);
console.log(content);

/* 

<div id="content">
  <div>
    <span>Child</span>
  </div>
  <div>
    <span>Child</span>
  </div>
</div>

*/

// node.remove() removes the node from its place
deepClonedDiv.remove();
console.log(content);

/* 

<div id="content">
  <div>
    <span>Child</span>
  </div>
</div>

*/
