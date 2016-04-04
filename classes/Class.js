const Class = function(parent){
  const klass = function(){
    this.init.apply(this, arguments);
  };

  // Change klass' prototype
  if(parent){
    const subclass = function(){};
    subclass.prototype = parent.prototype;
    klass.prototype = new subclass;
  }

  klass.prototype.init = function(){};

  // Shortcuts
  // Access klass prototype
  klass.fn = klass.prototype;
  // Access klass parent
  klass.fn.parent = klass;
  klass._super = klass.__proto__;

  // NOT NEEDED, .bind() handles this
  // // Adding a proxy function
  // klass.proxy = function(func){
  //   const self = this;
  //   return(function(){
  //     return func.apply(self, arguments);
  //   });
  // }
  //
  // // Add proxy function to instances too
  // klass.fn.proxy = klass.proxy;

  // Adding class properties
  // Class properties are accessed only by the Class function, not the instances of it
  klass.extend = function(obj){
    const extended = obj.extended;
    for(var i in obj){
      klass[i] = obj[i];
    }
    if(extended) extended(klass)
  };

  // Adding instance properties
  // Instance functions are added to the prototype of the Class function
  // so that they are accessed by any instances of the Class function
  klass.include = function(obj){
    const included = obj.included;
    for(var i in obj){
      klass.fn[i] = obj[i];
    }
    if(included) included(klass);
  };

  return klass;
}

export default Class;
