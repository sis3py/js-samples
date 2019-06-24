// Events

/* 
<!DOCTYPE html>
<html>
  <head>
    <title>Test</title>
    <meta charset="UTF-8" />
  </head>

  <body>
    <input id="button" type="button" value="Print" />
    <div id="content"></div>
    <button id="button-custom-event">Custom</button>
    <form id="form">
      <div id="div">
        <button id="link-button">Hello World</button>
      </div>
    </form>
    <script src="src/index.js"></script>
  </body>
</html>
*/

// 1 - Add handlers
// element.addEventListener(event, handler[, options])
// - event : the event name, e.g. "click".
// - handler : the handler function
// - options : An additional optional object with properties
//    -> once: if true, then the listener is automatically removed after it triggers.
//    -> capture: the phase where to handle the event
//    -> passive: if true, then the handler will not preventDefault()

const printFoo = () => console.log("Foo");
const printBar = () => console.log("Bar");
const button = document.querySelector("#button");
button.addEventListener("click", printFoo);
button.addEventListener("click", printBar);

// Each click on the button prints "Foo" and "Bar" into the console

// 2 - Remove handlers
// element.removeEventListener(event, handler[, options])
button.removeEventListener("click", printFoo); // Now, each click on the button prints only "Bar" into the console
button.removeEventListener("click", printBar); // Now, each click on the button prints nothing

// 3 - Event Object
// - type : event type, e.g. click
// - target: the most deeply nested element that caused the event
// - currentTarget: element that handled the event
// - clientX : window-relative x coordinates of the cursor, for mouse events
// - clientY : window-relative y coordinates of the cursor, for mouse events
const printEvent = ({ type, target, currentTarget, clientX, clientY }) =>
  console.log({
    type,
    target,
    currentTarget,
    clientX,
    clientY
  });
button.addEventListener("click", printEvent);

// Output after button click :
// {type: "click", target: HTMLInputElement, currentTarget: HTMLInputElement, clientX: 30, clientY: 24 }
button.removeEventListener("click", printEvent);

// 4 - Object handlers: handleEvent
const obj = {
  handleEvent() {
    console.log("Event with object method handler");
  }
};
button.addEventListener("click", obj);

// Output after button click :
// Event with object method handler
button.removeEventListener("click", obj);

// 5 - Class handlers: handleEvent
class TestClass {
  handleEvent() {
    console.log("Event with class method handler");
  }
}

const testClass = new TestClass();
button.addEventListener("click", testClass);

// Output after button click :
// Event with class method handler

// 6 - Bubbling
// When an event happens on an element, it first runs the handlers on it,
// then on its parent, then all the way up on other ancestors.

// <form id ="form">
// <div id="div">
// <button id="link-button">Hello World</button>
// </div>
// </form>
const printTargets = e =>
  console.log(`current target : ${e.currentTarget} target : ${e.target}`);
const form = document.querySelector("#form");
form.addEventListener("click", e => printTargets(e));
const div = document.querySelector("#div");
div.addEventListener("click", e => printTargets(e));
const a = document.querySelector("#link-button");
a.addEventListener("click", e => printTargets(e));

// Output after click on a :
// current target : [object HTMLButtonElement] target : [object HTMLButtonElement]
// current target : [object HTMLDivElement] target : [object HTMLButtonElement]
// current target : [object HTMLFormElement] target : [object HTMLButtonElement]

// 7 - event.stopPropagation() : stopping bubbling

// 8 - Event delegation
// - put a single handler on the container.
// - in the handler – check the source element event.target.
// - if the event happened inside an element that interests us, then handle the event.

// Benefits :
// - simplifies initialization and saves memory: no need to add many handlers.
// - less code: when adding or removing elements, no need to add/remove handlers.
// - DOM modifications: we can mass add/remove elements with innerHTML and alike.

// event.preventDefault() : prevent a default browser action

// Event constructor
// new Event(event type[, options]);
// - event type – may be any string, like "click" or custom type
// - options – the object with two optional properties:
//   -> bubbles: true/false – if true, then the event bubbles.
//   -> cancelable: true/false – if true, then the “default action” may be prevented
const customEvent = new Event("foo");

// elem.dispatchEvent(event) : attach a custom event
const buttonCustomEvent = document.querySelector("#button-custom-event");
buttonCustomEvent.dispatchEvent(customEvent);

// Native events
const uiEvent = new UIEvent("UI");
const focusEvent = new FocusEvent("Focus");
const mouseEvent = new MouseEvent("Event");
const wheelEvent = new WheelEvent("Wheel");
const keyboardEvent = new KeyboardEvent("keyboard");
