import Class from './Class';

const Person = new Class;

(() => {

const findById = function(id){
  return id;
};

// Class.extend iterates over an object copying the properties to the Class.
Person.extend({
  // All properties will only be available to Class Person, not instances of Person
  find: function(id){ if(typeof id === 'number') return findById(id) },
  exists: function(id){ return 'ID: ' + id + ' exists!' },
  extended: function(klass){
    return klass + ' was extended!';
  }
});

// Class.include iterates over an object copying the properties to the Class' prototype
Person.include({
  // All properties will be available to any instances of Person
  init: function(name){
    // Called on Person instantiation
    this.name = name;
  },
  breath: function(){
    return 'huff huff';
  },
  save: function(){},
  destroy: function(){}
});

})()

export default Person;
