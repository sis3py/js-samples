// Map data structure

// Building a Map, several ways :

// #1
const map1 = new Map();
map1.set("1", "val1"); // string key
map1.set(1, "val2"); // numeric key
map1.set(true, "val3"); // boolean key

const item = { id: 1, label: "item" };
map1.set(item, "val4"); // object key

// #2
const map2 = new Map();
map2
  .set("1", "val1")
  .set(1, "val2")
  .set(true, "val3")
  .set(item, "val4");

// #3
const map3 = new Map([
  ["1", "val1"],
  [1, "val2"],
  [true, "val3"],
  [item, "val4"]
]);

// #4
const map4 = new Map(
  Object.entries({
    1: "val1"
  })
);

// The key type is keeped
console.log(map1.get("1")); // val1
console.log(map1.get(1)); // val2
console.log(map1.get(true)); // val3
console.log(map1.get(item)); // val4

// Iterate over Map

// iterate over keys
for (let key of map1.keys()) {
  console.log(key);
}

/* 
OUTPUT: 

1 
1
true
{id: 1, label: "item"}

*/

// iterate over values
for (let value of map1.values()) {
  console.log(value);
}

/* 
OUTPUT: 

val1 
val2 
val3 
val4 

*/

// iterate over [key, value] entries
for (let entry of map1) {
  // or of map1.entries()
  console.log(entry);
}

/* 
OUTPUT: 

["1", "val1"]
[1, "val2"]
[true, "val3"]
[Object, "val4"]

*/

// iterate using .foreach()
map1.forEach((value, key) => {
  console.log(key, value);
});

/* 
OUTPUT: 

1 val1 
1 "val2" 
true "val3" 
{id: 1, label: "item"} "val4" 

*/

// Check existence of key
const hasKey = map1.has(1); // true

// Delete a key
map1.delete(1); // [1, "val2"] no more present within the Map

// Clear a Map
map1.clear(); // empty Map

// Count the entries
const size = map1.size; // 0
