import 'mocha';
import { expect } from 'chai';
import {EventEmitter} from 'events';
import {cliente} from '../src/client/clientC'


describe('Prueba Cliente', ()=>{
  const client = new cliente(60300);

  it('client es una intancia de la clase cliente', () => {
    expect(client).to.be.instanceOf(cliente);
  });
});

