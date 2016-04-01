import { expect } from 'chai';
import Person from '../classes/classes';

describe('Classes', () => {
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
})
