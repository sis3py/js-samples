// Specific Set : WeakSet

let item1 = { id: 1, label: "item 1" };

// Values must ALWAYS be object
const weakSet = new WeakSet();
weakSet.add(item1);

// Value from an other type
// weakSet.add("item2");
// TypeError: Invalid value used in weak set

// Deleted objects are automatically removed from WeakSet
item1 = null; // Now WeakSet is empty

// /!\ Iteration, .size(), .clear() not available
