import * as yargs from 'yargs';
import { cliente, RequestType } from './client/clientC';



const client = new cliente(60300);
let peticion: RequestType = {};

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
    if (typeof argv.user === 'string' && typeof argv.title === 'string' && typeof argv.body === 'string' && typeof argv.color === 'string') {
      peticion = {type: 'add', user: argv.user, title: argv.title, body: argv.body, color: argv.color};
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
      peticion = {type: 'remove', user: argv.user, title: argv.title};
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
    if (typeof argv.user === 'string' && typeof argv.title === 'string' && typeof argv.body === 'string' && typeof argv.color === 'string') {
      peticion = {type: 'update', user: argv.user, title: argv.title, body: argv.body, color: argv.color};
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
      peticion = {type: 'read', user: argv.user, title: argv.title};
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
      peticion = { type: 'list', user: argv.user};
    }
  }
});

yargs.parse();

client.request(peticion);