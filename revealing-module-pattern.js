// Revealing Module Pattern

const userModule = (function () {

  let users = {}; // Private array of users

  function addNormalizedEntry (entry, entries) { // Private function
    return {
      ...entries,
      [entry.id] : entry
    }
  }

  function removeNormalizedEntry (entry, entries) { // Private function
    const { [entry.id]: value, ...rest } = entries;
    return rest;
  }

  function getNormalizedEntry (id, entries) { // Private function
    return entries[id];
  }

  function getNormalizedEntries (entries) { // Private function
    return Object.keys(entries).map(entryId => entries[entryId]);
  }

  function addUser(user) { // Public function
    users = addNormalizedEntry(user, users);
  }

  function removeUser(user) { // Public function
    users = removeNormalizedEntry(user, users);
  }

  function getUser(userId) { // Public function
    return getNormalizedEntry(userId, users);
  }

  function getUsers() { // Public function
    return getNormalizedEntries(users);
  }

  return {
    getAll:getUsers,
    get: getUser,
    add: addUser,
    remove: removeUser,
  }
})(); // IIFE here

userModule.add({id:1, firstname: 'John', lastname: 'Doe'});
userModule.add({id:2, firstname: 'Arnold', lastname: 'Johnson'});

console.log(userModule.get(1));
/* 
OUTPUT : 

{
  id: 1
  firstname: "John"
  lastname: "Doe"
}

*/

console.log(userModule.getAll());
/* 
OUTPUT : 

[
  {
    id: 1
    firstname: "John"
    lastname: "Doe"
  }

  {
    id: 2
    firstname: "Arnold"
    lastname: "Johnson"
  }
]

*/

userModule.remove({id:1, firstname: 'John', lastname: 'Doe'});
console.log(userModule.getAll());
/* 
OUTPUT : 

[
  {
    id: 2
    firstname: "Arnold"
    lastname: "Johnson"
  }
]

*/


console.log(userModule.users); // Undefined