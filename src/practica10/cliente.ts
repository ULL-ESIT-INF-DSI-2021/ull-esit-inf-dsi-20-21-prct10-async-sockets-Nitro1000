const chalk = require("chalk");
import * as yargs from 'yargs';
import * as fs from 'fs';
import * as net from 'net';
import { Comando } from './comando';

/**
 * Comando para enviar al servidor
 */
yargs.command({
  command: 'comando',
  describe: 'Add a new note',
  builder: {
    comando: {
      describe: 'nombre del comando',
      demandOption: true,
      type: 'string',
    },
    opt: {
      describe: 'opciones del comando',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if (typeof argv.comando === 'string' && typeof argv.opt === 'string') {
      const comando:Comando = new Comando(argv.comando,argv.opt);
      const client = net.connect({ port: 60300 });
      client.write(comando.write());
    } else {
      console.log(chalk.red('Argument invalid'));
    }
  },
});

