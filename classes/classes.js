const Class = function(){
  const klass = function(){
    this.init.apply(this, arguments);
  };

  klass.prototype.init = function(){};

  // Shortcut to access prototype
  klass.fn = klass.prototype;

  // Shortcut to access parent
  klass.fn.parent = klass;

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

const Person = new Class;
Person.fn = Person.prototype;

Person.fn.init = function(name){
  // Called on Person instantiation
  this.name = name;
};

Person.fn.breath = function(){
  return 'huff huff';
};

export default Person;
