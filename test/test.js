import { expect } from 'chai';
import Class from '../classes/Class';
import Person from '../classes/Person';
import {Dog, Cat} from '../classes/Animal';
import PubSub from '../events/PubSub.js';

describe('Classes', () => {
  describe('Instances', () => {
    it('Creates a new instance', () => {
      const justify = new Person('Justify');
      expect(justify.name).to.equal('Justify');
    }),
    it('Changes the context of this', () => {
      const justify = new Person('Justify');
      const crippler = new Person('Crippler');
      expect(justify.name).to.equal('Justify');
      expect(crippler.name).to.equal('Crippler');
    }),
    it('Inherits functions from Constructor\'s prototype', () => {
      const justify = new Person('Justify');
      expect(justify.breath()).to.equal('huff huff');
    });
  });

  describe('.extend', () => {
    it('Iterates over an object and adds properties to the Class', () => {
      expect(Person.find(1)).to.equal(1);
      expect(Person.exists(1)).to.equal('ID: 1 exists!');
    });
    it('Only adds properties to the Class, not the instance', () => {
      const justify = new Person('Justify');
      expect(justify.find).to.be.undefined;
    });
  });

  describe('.include', () => {
    it('Iterates ove an object and adds properties to the Class\' prototype', () => {
      const justify = new Person('Justify');
      expect(justify.name).to.equal('Justify');
      expect(justify.breath()).to.equal('huff huff')
    })
  });

  describe('Prototypical Inheritance', () => {
    it('Inherits the properties of the Constructor', () => {

      // Adds a method to Constructor Dog that is not available to Animal
      Dog.prototype.wag = function(){ return 'wag tail'; };

      // Create an instance of Dog
      // Has reference to .breath and .wag
      const dog = new Dog;

      // Create an instance of Cat
      // Has reference to .breath but not .wag
      const cat = new Cat;

      // .breath not found on dog, checks Constructor Dog, not found, checks Class Animal, found.
      expect(dog.breath()).to.equal('breath');
      // .wag not found on dog, checks Constructor Dog, found.
      expect(dog.wag()).to.equal('wag tail');
      // .breath not found on cat, checks Constructor Cat, not found, checks Class Animal, found.
      expect(cat.breath()).to.equal('breath');
      // .wag not found on cat, Constructor Cat, or Class Animal, errors
      expect(cat.wag).to.be.undefined;

    });
  });

});

describe('Events', () => {

  describe('Listening', () => {
    const listener = function(){ this.innerHTML = 'Clicked!'; }
    it('Can react to events using .addEventListener', () => {
      const btn = document.createElement('button');
      btn.addEventListener('click', listener);
      btn.click();
      expect(btn.innerHTML).to.equal('Clicked!');
    });
    it('Can remove listeners that have been assigned', () => {
      const btn = document.createElement('button');
      btn.addEventListener('click', listener);
      btn.removeEventListener('click', listener);
      btn.click();
      expect(btn.innerHTML).to.equal('');
    });
  });

  describe('Context Change', () => {
    it('addEventListener changes context to the targeted element', () => {
      const btn = document.createElement('button');
      const func = function(){
        this.appName = 'EventTest';

        btn.addEventListener('click', (e) => {
          // Context has changed so appName will be undefined
          e.target.innerHTML = this.appName;
        });

        btn.click();

        expect(btn.innerHTML).to.be.undefined;
      }
    });
  });

  describe('PubSub', () => {
    it('Reacts to custom events by firing callback functions', () => {
      const el = document.createElement('button');
      PubSub.subscribe('wem', () => {
        el.innerHTML = 'Fired';
      });

      PubSub.publish('wem');

      expect(el.innerHTML).to.equal('Fired');
    })
  });

});
