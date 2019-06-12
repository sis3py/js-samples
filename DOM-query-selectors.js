// DOM Searching: getElement*, querySelector*

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

// document.getElementById(id)
const mainContainer = document.getElementById("main-container");
console.log(mainContainer); // <div id="main-container"> … </div>

// element.querySelectorAll(cssSelector)
// Returns all elements inside element matching the given CSS selector.
// Can use pseudo-classes as well
const pInsideMainContainer = document.querySelectorAll("#main-container > p");
console.log(pInsideMainContainer); // [<p>Hello</p>]

// element.querySelector(cssSelector)
// Returns the first element inside element matching the given CSS selector.
const firstPInsideMainContainer = document.querySelector("#main-container > p");
console.log(firstPInsideMainContainer); // <p>Hello</p>

// element.matches(cssSelector)
// Checks if elem matches the given CSS-selector and returns true or false.
console.log(firstPInsideMainContainer.matches("#main-container > p")); // true

// element.closest(cssSelector)
// Looks the nearest ancestor that matches the CSS-selector.
// The element itself is also included in the search.
const mainContainerClosestDiv = mainContainer.closest("div");
console.log(mainContainerClosestDiv); // <div id="main-container"> … </div>

// element.getElementsByTagName(tag)
// Looks for elements with the given tag and returns the collection of them.
// The tag parameter can also be a star "*" for “any tags”

// element.getElementsByClassName(className)
// Returns elements that have the given CSS class

// document.getElementsByName(name)
// Returns elements with the given name attribute, document-wide

/*
Summary 

Method	                 Searches by...	  Can call on an element ?	Live ?
querySelector	         |  CSS-selector	|          ✔	          |   -
querySelectorAll	     |  CSS-selector	|          ✔	          |   -
getElementById	       |  id	          |          -	           |   -
getElementsByName	     |  name	        |          -	           |   ✔
getElementsByTagName   |	tag or '*'	  |          ✔	           |   ✔
getElementsByClassName |	class	        |          ✔	           |   ✔
*/
