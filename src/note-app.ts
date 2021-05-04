import { Note } from './note';
import * as fs from 'fs';
// import * as chalk from 'chalk';

const chalk = require("chalk");

/**
 * Clase que contendra los comandos principales para administrar las notas
 */
export class NoteApp {
  /**
   * Constructor de la clase
   */
  constructor() { }

  /**
   * Añadir una nota respecto a un usuario en especifico
   * @param user Nombre del usuario
   * @param title Titulo de la nota
   * @param body Contenido de la nota
   * @param color Color de la nota
   */
  addNote(user: string, title: string, body: string,
    color: string) {
    if (!fs.existsSync(`dataUsers/${user}`)) {
      console.log(`Se creara el directorio ${user}`);
      fs.mkdirSync(`dataUsers/${user}`, { recursive: true });
    }
    const note = new Note(title, body, color);
    if (!fs.existsSync(`dataUsers/${user}/${title}.json`)) {
      fs.writeFileSync(`dataUsers/${user}/${title}.json`, note.write());
      console.log(chalk.green('New note added!'));
    } else
      console.log(chalk.red('Note title taken!'));
  }

  /**
   * Borra la nota del usuario con el titulo especificado
   * @param user Nombre del usuario
   * @param title Titulo de la nota
   */
  removeNote(user: string, title: string) {
    if (fs.existsSync(`dataUsers/${user}/${title}.json`)) {
      fs.rmSync(`dataUsers/${user}/${title}.json`);
      console.log(chalk.green('Note removed!'));
    } else
      console.log(chalk.red('Note not found'));

  }

  /**
   * Modifica la nota especificada del usuario
   * @param user Nombre del usuario
   * @param title Titulo de la nota
   * @param body Contenido nuevo de la nota
   * @param color Color de la nota
   */
  modifyNote(user: string, title: string, body: string,
    color: string) {
    if (fs.existsSync(`dataUsers/${user}/${title}.json`)) {
      const note = new Note(title, body, color);
      fs.writeFileSync(`dataUsers/${user}/${title}.json`, note.write());
      console.log(chalk.green('Modified note!'));
    } else
      console.log(chalk.red('Note not found'));

  }

  /**
   * Se obtienen todas las notas de un usuario en especifico
   * @param user Nombre del usuario
   * @returns Las notas del usuario
   */
  listNotes(user: string): Note[] {
    let allNotes: Note[] = [];
    fs.readdirSync(`dataUsers/${user}`).forEach((notes) => {
      const contentNote = fs.readFileSync(`dataUsers/${user}/${notes}`);
      const JSONote = JSON.parse(contentNote.toString());
      const note = new Note(JSONote.title, JSONote.body, JSONote.color);
      allNotes.push(note);
    });
    return allNotes;
  }

  /**
   * Muestra el contenido de la nota con el titulo especificado del usuario
   * en su respectivo color
   * @param user Nombre del usuario
   * @param title Titulo de la nota
   */
  readNote(user: string, title: string) {
    if (fs.existsSync(`dataUsers/${user}/${title}.json`)) {
      const contentNote = fs.readFileSync(`dataUsers/${user}/${title}.json`);
      const JSONote = JSON.parse(contentNote.toString());
      const note = new Note(JSONote.title, JSONote.body, JSONote.color);
      console.log(chalk.keyword(note.getColor())(note.getTitle()));
      console.log(chalk.keyword(note.getColor())(note.getBody()));
    } else
      console.log(chalk.red('Note not found'));
  }
}
