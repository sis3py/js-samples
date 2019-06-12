// Attributes and properties

/* 
<!DOCTYPE html>
<html>
  <head>
    <title>Parcel Sandbox</title>
    <meta charset="UTF-8" />
  </head>

  <body>
    <div id="data" data-identifier="102"></div>
    <div id="content" custom="test"></div>
    <div id="app"></div>
    <div id="styled" style="color:blue;border:1px solid black"></div>
    <input id="input" type="checkbox" checked /> checkbox
    <script src="src/index.js"></script>
  </body>
</html>
*/

// DOM properties
// DOM nodes are regular JavaScript objects. We can alter them
document.body.test = "Hello";
console.log(document.body.test); // Hello

// HTML attributes : standard HTML attributes are accessible as DOM property
const content = document.getElementById("content");
console.log(content.id); // content (standard attribute)
console.log(content.custom); // undefined (non standard attribute)

// All attributes (standard / non standard) are accessible using :

// element.attributes - get all attributes
for (const attr of content.attributes) {
  console.log(`${attr.name} = ${attr.value}`);
}

/*
OUTPUT :

id = content 
custom = test

*/

// element.hasAttribute(name) – checks for existence
console.log(content.hasAttribute("custom")); // true

// element.getAttribute(name) – gets the value.
console.log(content.getAttribute("custom")); // test

// element.setAttribute(name, value) – sets the value
content.setAttribute("custom", "new test");
console.log(content.getAttribute("custom")); // new test

// element.removeAttribute(name) – removes the attribute.
content.removeAttribute("custom");
console.log(content.getAttribute("custom")); // null

// Property-attribute synchronization
// Some properties are automatically updated, some are not :
// - attribute changes, the corresponding property is auto-updated (e.g. id)
// - synchronizes only from attribute → to property, but not back (e.g. input.value)

// DOM properties are typed

// - input.checked is a boolean
const input = document.getElementsByTagName("input")[0];
console.log(input.checked); // true

// - style attribute is a string, but the style property is an object
const styledDiv = document.getElementById("styled");
console.log(styledDiv.style); // {...} of type CSSStyleDeclaration

// Dataset
// Using data-* attributes is a valid, safe way to pass custom data
const data = document.getElementById("data"); // data is <div id="data" data-identifier="102"></div>
console.log(data.dataset.identifier); // 102
