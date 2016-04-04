const PubSub = {
  subscribe: function(ev, callback){
    // Create _callbacks object, unless it already exists
    if(!this._callbacks) this._callbacks = {};

    // Create an array for the given event key, unless it exists, then
    // append the callback to the array
    if(!this._callbacks[ev]) this._callbacks[ev] = [];
    this._callbacks[ev].push(callback);
    return this;
  },

  publish: function(){
    // Turn arguments object into a real array
    const args = [...arguments];

    // Extract the first argument, the event name
    const ev = args.shift();

    // Return if there isn't a _callbacks object, or
    // if it doesn't contain an array for the given event
    let list, calls, i, l;
    if(!(calls = this._callbacks)) return this;
    if(!(list = this._callbacks[ev])) return this;

    // Invoke the callbacks
    list.map((item) => {
      item.apply(this, args);
    });
    return this;
  }
};

export default PubSub;
