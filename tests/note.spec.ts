import 'mocha';
import {expect} from 'chai';
import {Note} from '../src/note';

describe('Test Note', () => {
  const testNota = new Note('Test Nota', 'Nota prueba', 'Blue');

  it('La nota es una intancia de la clase Note', () => {
    expect(testNota).to.be.instanceOf(Note);
  });

  it('El titulo de la nota es Test Nota', () => {
    expect(testNota.getTitle()).to.be.eql('Test Nota');
  });

  it('El contenido de la nota es Nota prueba', () => {
    expect(testNota.getBody()).to.be.eql('Nota prueba');
  });

  it('El color de la nota es Blue', () => {
    expect(testNota.getColor()).to.be.eql('Blue');
  });

});