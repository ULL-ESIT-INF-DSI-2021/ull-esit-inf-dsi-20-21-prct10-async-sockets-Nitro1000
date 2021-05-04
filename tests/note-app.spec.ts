import 'mocha';
import { expect } from 'chai';
import { Note } from '../src/note';
import { NoteApp } from '../src/note-app';
import * as fs from 'fs';

describe('Test NoteApp', () => {
  const appNote = new NoteApp();
  it('Se puede crear una nueva nota', () => {
    appNote.addNote('Test', 'noteTest', 'Nota de prueba', 'blue');
    expect(fs.existsSync('dataUsers/Test/noteTest.json')).true;
  });

  it('Se puede listar las notas de un usuario', () => {
    appNote.addNote('Test', 'noteTest2', 'Nota de prueba',
      'blue');

    const nota1 = new Note('noteTest',
      'Nota de prueba', 'blue');
    const nota2 = new Note('noteTest2', 'Nota de prueba',
      'blue');
    expect(appNote.listNotes('Test')).to.be.eql([nota1, nota2]);
  });

  it('Se puede eliminar una nota', () => {
    appNote.removeNote('Test', 'noteTest');
    expect(fs.existsSync('dataUsers/Test/noteTest.json')).false;
  });
});
