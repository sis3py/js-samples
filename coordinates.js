// Coordinates

// Most JavaScript methods deal with one of two coordinate systems:
// - relative to the window(or another viewport) top/left.
// - relative to the document top/left.

// Window coordinates: getBoundingClientRect
// returns window coordinates for elem as an object with properties :
// - top – Y-coordinate for the top element edge
// - left – X-coordinate for the left element edge
// - right – X-coordinate for the right element edge
// - bottom – Y-coordinate for the bottom element edge
const element = document.querySelector("#element");
const windowCoordinates = element.getBoundingClientRect();
console.log(windowCoordinates.top); // 8
console.log(windowCoordinates.left); // 8
console.log(windowCoordinates.right); // 20
console.log(windowCoordinates.bottom); // 20

console.log(windowCoordinates.bottom - windowCoordinates.top); // 12 (height)
console.log(windowCoordinates.right - windowCoordinates.left); // 12 (width)

// /!\ Window coordinates do not take the scrolled out part of the document into account,
// they are calculated from the window’s upper-left corner (change while scrolling)

// elementFromPoint(x, y)
// returns the most nested element at window coordinates (x, y)
const mostNestedElementAtCoordinates = document.elementFromPoint(8, 8);
console.log(mostNestedElementAtCoordinates === element); // true

// /!\ For out-of-window coordinates the elementFromPoint returns null

// Document coordinates
// start from the upper-left corner of the document, not the window.
// When the page is not scrolled, then window coordinate and document coordinates are actually the same

// Getting document coordinates
// There’s no standard method to get the document coordinates of an element
// This formula can be used :
// - pageY = clientY + height of the scrolled-out vertical part of the document.
// - pageX = clientX + width of the scrolled-out horizontal part of the document.

// get document coordinates of the element
const getDocumentCoordinates = element => {
  const coordinates = element.getBoundingClientRect();

  return {
    top: coordinates.top + window.pageYOffset,
    left: coordinates.left + window.pageXOffset
  };
};

console.log(getDocumentCoordinates(element)); // {top: 8, left: 8}
