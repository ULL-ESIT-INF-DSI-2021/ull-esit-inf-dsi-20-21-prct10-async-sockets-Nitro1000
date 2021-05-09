import EventEmitter from "events";
import * as net from 'net';
const chalk = require("chalk");


/**
 * Tipo del mensaje que se enviara al servidor
 */
export type RequestType = {
  type?: 'add' | 'update' | 'remove' | 'read' | 'list';
  user?: string;
  title?: string;
  body?: string;
  color?: string;
}

/**
 * Clase cliente que deriva de EvenEmitter para simular el cliente
 */
export class cliente extends EventEmitter {
/**
 * Constructor de la clase 
 * @param puerto numero del puerto del cliente
 */
  constructor(public puerto: number) {
    super();
  }
/**
 * metodo run para obtener los datos del servidor
 * @param client socket del cliente
 */
  run(client: net.Socket) {
    let wholeData = '';
    client.on('data', (dataChunk) => {
      wholeData += dataChunk;
    });

    // Cuando se tenga toda la data 
    client.on('end', () => {
      const info = JSON.parse(wholeData)
      switch (info.type) {
        case 'add':
          if (info.success)
            console.log(chalk.green("Nota Añadida"));
          else
            console.log(chalk.red("Ya existe"));
          break;
        case 'update':
          if (info.success)
            console.log(chalk.green("Nota Actualizada"));
          else
            console.log(chalk.red("La nota no existe"));
          break;
        case 'remove':
          if (info.success)
            console.log(chalk.green("Nota eliminada"));
          else
            console.log(chalk.red("La nota no existe"));
          break;
        case 'read':
          if (info.success) {
            console.log("Titulo: " + chalk.keyword(info.notes[0].color)(info.notes[0].title));
            console.log("Body: " + chalk.keyword(info.notes[0].color)(info.notes[0].body));
          }
          break;
        case 'list':
          if (info.success) {
            info.notes.forEach((element: any) => {
              console.log("Titulo: " + chalk.keyword(element.color)(element.title));
              console.log("Body: " + chalk.keyword(element.color)(element.body));
            });
          }
          else {
            console.log(chalk.red("El usuario no existe"));
          }
          break;
        default:
          console.log(`El tipo ${chalk.red(info.type)} no es valido`);
          break;
      }
    });
  }


/**
 * Metodo para enviar los datos al servidor
 * @param peticion mensaje que se envia al servidor
 */
  public request(peticion: RequestType) {
    const client = net.connect({ port: this.puerto });
    client.write(JSON.stringify(peticion) + '\n');
    this.run(client);
  }
}