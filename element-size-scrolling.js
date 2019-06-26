// Element size and scrolling

/* 
<!DOCTYPE html>
<html>
  <head>
    <title>Test</title>
    <meta charset="UTF-8" />
  </head>

  <body>
      <main style="position: relative" id="main">
          <article></article>
            <div id="element" style="position: absolute; width: 50px; height:20px; padding: 20px; border: 10px solid black;left: 180px; top: 120px">
            </div>
          </article>
        </main>
    <script src="src/index.js"></script>
  </body>
</html>
*/
// offsetParent, offsetLeft, offsetTop
// offsetParent is the nearest ancestor that is:
// - CSS-positioned (position is absolute, relative, fixed or sticky)
// - or <td>, <th>, <table>
// - or <body>
const element = document.querySelector('#element');
console.log(element.offsetParent); // <main>...</main>
console.log(element.offsetLeft); // 180
console.log(element.offsetTop); // 120

// /!\ offsetParent is null :
// - not shown elements (display:none or not in the document)
// - for <body> and <html>
// - for elements with position:fixed

// offsetWidth, offsetHeight
// Full size of a component including borders and paddings
console.log(element.offsetWidth); // 110 (50 + 2 * 20 + 2 * 10)
console.log(element.offsetHeight); // 80 (20 + 2 * 20 + 2 * 10)

// clientTop, clientLeft
//  top or left border width
console.log(element.clientTop); // 10
console.log(element.clientLeft); // 10

// clientWidth, clientHeight
// /!\ only account for the visible part of the element.
// provide the size of the area inside the element borders.
// include the content width together with paddings, but without the scrollbar
// (If there are no paddings, then clientWidth/Height is exactly the content area, inside the borders and the scrollbar (if any))
console.log(element.clientWidth); // 90 ( 50 + 2 * 20)
console.log(element.clientHeight); // 60 (20 + 2 * 20)

// scrollWidth, scrollHeight
// /!\ include the scrolled out (hidden) parts
// full inner width / height of the content area including the scrolled out parts
console.log(element.scrollWidth); // 90 (no scroll)
console.log(element.scrollHeight); // 60 (no scroll)

// scrollLeft, scrollTop
// width/height of the hidden, scrolled out part of the element
// “how much is scrolled up”
// /!\ Can be edited
console.log(element.scrollLeft);  // 0 (no scroll)
console.log(element.scrollTop);  // 0 (no scroll)

// documentElement.clientHeight / documentElement.clientWidth
// find out the width and height of the browser window
console.log(document.documentElement.clientHeight); // 282
console.log(document.documentElement.clientWidth); // 502

// scrollWidth , scrollHeight of the document
// To reliably obtain the full document height, we should take the maximum of these properties:
// (old inconsistencies from ancient times)
const scrollHeight = Math.max(
  document.body.scrollHeight, document.documentElement.scrollHeight,
  document.body.offsetHeight, document.documentElement.offsetHeight,
  document.body.clientHeight, document.documentElement.clientHeight
);

console.log(scrollHeight); // 282

const scrollWidth = Math.max(
  document.body.scrollWidth, document.documentElement.scrollWidth,
  document.body.offsetWidth, document.documentElement.offsetWidth,
  document.body.clientWidth, document.documentElement.clientWidth
);

console.log(scrollWidth); // 502

// Get the current scroll
// window.pageXOffset, window.pageYOffset
// DOM elements have their current scroll state in elem.scrollLeft, scrollTop
console.log(window.pageXOffset); // 0
console.log(window.pageYOffset); // 0


// Change the current scroll
// - window.scrollTo(pageX,pageY) (absolute coordinates)
// - window.scrollBy(x,y) (scroll relative the current place)
// - elem.scrollIntoView(top) (scroll to make elem visible (align with the top/bottom of the window))
window.scrollTo(200, 200);
window.scrollBy(-200, 500);
element.scrollIntoView() // page scrolls to make elem appear on the top of the window
element.scrollIntoView(false) // page scrolls to make elem appear at the bottom
