// 1 - Property getters and setters
const user1 = {
  firstname: "John", // Data property
  lastname: "Doe", // Data property

  // fullname is an accessor property
  get fullName() {
    // Getter
    return `${this.firstname} ${this.lastname}`;
  },

  set fullName(value) {
    // Setter
    [this.firstname, this.lastname] = value.split(" ");
  }
};

delete user1.fullname; // delete is useless with accessor properties
const user1Fullname = user1.fullName; // Behave like a data property
console.log(user1Fullname); // OUTPUT : John Doe

// 2 - Accessor descriptors
// - get replace value
// - set replace writable
// - enumerable
// - configurable

let user2 = {
  firstname: "Peter",
  lastname: "Johnson"
};

Object.defineProperty(user2, "fullName", {
  get() {
    return `${this.firstname} ${this.lastname}`;
  },

  set(value) {
    [this.firstname, this.lastname] = value.split(" ");
  }
});

const user2Fullname = user2.fullName;
console.log(user2Fullname); // OUTPUT : Peter Johnson

// 3 - Better use of Getters / Setters using priva

const user3 = {
  get firstname() {
    // Getter act as a wrapper over _firstname
    return this._firstname;
  },

  set firstname(value) {
    // Setter act as a wrapper over _firstname
    if (value.length === 0) {
      console.log("A non empty firstname must be provided");
      return;
    }
    this._firstname = value;
  }
};

user3.firstname = ""; // OUTPUT: A non empty firstname must be provided
user3._firstname = "Robert"; // /!\ _firstname act as private but is still accessible
console.log(user3.firstname); // OUTPUT: Robert
