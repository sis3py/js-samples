// Styles and classes

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

// className
const content = document.getElementById("content");
content.className = "main-content col-1";
console.log(content); // <div id="content" class="main-content col-1"></div>

// classList

// classList.add : add class to existing ones
content.classList.add("row-1");
console.log(content); // <div id="content" class="main-content col-1 row-1"></div>

// classList.remove : remove class from existing ones
content.classList.remove("col-1");
console.log(content); // <div id="content" class="main-content row-1"></div>

// classList.toggle : add class if it doesn’t exist, otherwise removes it
content.classList.toggle("row-1");
console.log(content); // <div id="content" class="main-content"></div>
content.classList.toggle("row-1");
console.log(content); // <div id="content" class="main-content row-1"></div>

// classList.contains : returns true/false, checks for the given class.
console.log(content.classList.contains("row-1")); // true

// Element style
// background-color  => elem.style.backgroundColor
// z-index           => elem.style.zIndex
// border-left-width => elem.style.borderLeftWidth
// ...
content.style.backgroundColor = "red";
console.log(content); // <div id="content" class="main-content row-1" style="background-color: red;"></div>

// Resetting the style property
content.style.backgroundColor = "";
console.log(content); // <div id="content" class="main-content row-1" style=""></div>

// Full rewrite with style.cssText ( /!\ erase previous style)
content.style.cssText = `background-color: yellow;width: 100px;`;
console.log(content); // <div id="content" class="main-content row-1" style="background-color: yellow; width: 100px;"></div>

// Computed styles: getComputedStyle
const contentComputedStyle = getComputedStyle(content);
console.log(contentComputedStyle.fontFamily); // "Times New Roman"

// /!\ Computed and resolved values ( value is the one finally applied to the element)
