const chalk = require("chalk");
import * as yargs from 'yargs';
import { Note } from './note'

import { NoteApp } from './note-app';

/**
 * Objeto que nos permitira ejecutar las diferentes funciones que solicite
 * el usuario
 */
const appNote = new NoteApp();

/**
 * Comando add para añadir una nota
 */
yargs.command({
  command: 'add',
  describe: 'Add a new note',
  builder: {
    user: {
      describe: 'User name',
      demandOption: true,
      type: 'string',
    },
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string',
    },
    body: {
      describe: 'Note body',
      demandOption: true,
      type: 'string',
    },
    color: {
      describe: 'Note color',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if (typeof argv.user === 'string' && typeof argv.title === 'string' &&
      typeof argv.body === 'string' && typeof argv.color === 'string') {
      appNote.addNote(argv.user, argv.title, argv.body, argv.color);
    } else {
      console.log(chalk.red('Argument invalid'));
    }
  },
});

/**
 * Comando read para leer una nota
 */
yargs.command({
  command: 'read',
  describe: 'Read a note',
  builder: {
    user: {
      describe: 'User name',
      demandOption: true,
      type: 'string',
    },
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if (typeof argv.user === 'string' && typeof argv.title === 'string') {
      appNote.readNote(argv.user, argv.title);
    } else {
      console.log(chalk.red('Argument invalid'));
    }
  },
});

/**
 * Comando list para ver las notas del usuario
 */
yargs.command({
  command: 'list',
  describe: 'List all note',
  builder: {
    user: {
      describe: 'User name',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if (typeof argv.user === 'string') {
      const notas: Note[] = appNote.listNotes(argv.user);
      console.log(chalk.blue('Notas de ' + argv.user));
      notas.forEach((nota) => {
        console.log(chalk.keyword(nota.getColor())(nota.getTitle()));
      });
    } else {
      console.log(chalk.red('Argument invalid'));
    }
  },
});

/**
 * Comando remove para eliminar una nota
 */
yargs.command({
  command: 'remove',
  describe: 'Remove a note',
  builder: {
    user: {
      describe: 'User name',
      demandOption: true,
      type: 'string',
    },
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if (typeof argv.user === 'string' && typeof argv.title === 'string') {
      appNote.removeNote(argv.user, argv.title);
    } else {
      console.log(chalk.red('Argument invalid'));
    }
  },
});

/**
 * Comando modify para modificar una nota del usuario
 */
yargs.command({
  command: 'modify',
  describe: 'Modify a note',
  builder: {
    user: {
      describe: 'User name',
      demandOption: true,
      type: 'string',
    },
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string',
    },
    body: {
      describe: 'Note body',
      demandOption: true,
      type: 'string',
    },
    color: {
      describe: 'Note color',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if (typeof argv.user === 'string' && typeof argv.title === 'string' &&
      typeof argv.body === 'string' && typeof argv.color === 'string') {
      appNote.modifyNote(argv.user, argv.title, argv.body, argv.color);
    } else {
      console.log(chalk.red('Argument invalid'));
    }
  },
});

yargs.parse();