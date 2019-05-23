// Specific Map : WeakMap

let item1 = { id: 1, label: "item 1" };

// Keys must ALWAYS be object
const weakMap = new WeakMap();
weakMap.set(item1, "val1");

// Keys from an other type
// weakMap.set("item2", "val1");
// TypeError: Invalid value used as weak map key

// Deleted objects are automatically removed from WeakMap
item1 = null; // Now weakMap is empty

// /!\ Iteration, .size(), .clear() not available
