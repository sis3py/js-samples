// Set data structure

const set1 = new Set();

const item1 = { id: 1, label: "item 1" };
const item2 = { id: 2, label: "item 2" };
const item3 = { id: 3, label: "item 3" };

// Try to add some duplicates
set1.add(item1);
set1.add(item1);
set1.add(item2);
set1.add(item3);
set1.add(item3);

// Iterate using for ... of
for (let value of set1) {
  console.log(value);
}

// Iterate using .forEach()
set1.forEach((value, valueAgain, set) => {
  console.log(value);
});

/* 
OUTPUT:

{id: 1, label: "item 1"}
{id: 2, label: "item 2"}
{id: 3, label: "item 3"}

*/

// Check existence of value
const hasValue = set1.has(item1); // true

// Delete a value (returns true if value found otherwise false)
set1.delete(item1); // true
set1.delete(123); // false

// Clear a Set
set1.clear(); // empty Map

// Count the entries
const size = set1.size; // 0
