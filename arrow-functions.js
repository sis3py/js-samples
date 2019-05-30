// arrow functions
// - can’t run with new
// - don't have 'this'
// - don't have the 'arguments' variable
// - don’t have super
let group = {
  name: "Admin",
  users: ["John Doe", "Robert Johnson"],

  showUsers() {
    // this.students.forEach(function(student) {
    //   // Error: Cannot read property 'title' of undefined
    //   console.log(this.title + ': ' + student)
    // });
    this.users.forEach((
      user // this is not changed
    ) => console.log(this.name + ": " + user));
  }
};

group.showUsers();

/* 
OUTPUT: 

Admin: John Doe 
Admin: Robert Johnson 

*/
