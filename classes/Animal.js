import Class from './Class';

const Animal = new Class;
Animal.include({
  breath: function(){
    return 'breath';
  }
});

const Dog = new Class(Animal);
const Cat = new Class(Animal);

export {Animal, Cat, Dog};
