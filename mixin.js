// Mixin
// contains methods for use by other classes without having to be the parent class of those other classes.

// Create a mixin about event handling
const eventMixin = {
  // Event subscription : menu.on('eventName', (item) => { ... }
  on(eventName, handler) {
    // Create the event handlers container if not already done
    if (!this._eventHandlers) this._eventHandlers = {};

    // Create the event if not already done
    if (!this._eventHandlers[eventName]) {
      this._eventHandlers[eventName] = [];
    }

    // Add the given handler to the handlers
    this._eventHandlers[eventName] = [
      ...this._eventHandlers[eventName],
      handler
    ];
  },

  // Event subscription cancelling : menu.off('eventName', handler)
  off(eventName, handler) {
    // Return an error if no handlers found
    if (!(this._eventHandlers && this._eventHandlers[eventName])) {
      throw new Error("No handlers for that event name");
    }

    // Filter the handlers by removing the given handler
    this._eventHandlers[eventName] = this._eventHandlers[eventName].filter(
      h => h !== handler
    );
  },

  // Generate the event: this.trigger('eventName', arg1, ..., argN);
  trigger(eventName, ...args) {
    if (!this._eventHandlers || !this._eventHandlers[eventName]) {
      throw new Error("No handlers for that event name");
    }

    // Call the handlers
    this._eventHandlers[eventName].forEach(handler =>
      handler.apply(this, args)
    );
  }
};

// Usage :

class Message {
  send(title, body) {
    this.trigger("send", { title, body });
  }
  onReceived(message) {
    console.log(`Message received : ${message.title} - ${message.body}`);
  }
}
// Augment the class with the event mixin : give access to all its methods
Object.assign(Message.prototype, eventMixin);

const message = new Message();

// Bind the send event
message.on("send", message.onReceived);

// triggers the send event
message.send("Hello", "How are you my friend"); // Message received : Hello - How are you my friend
