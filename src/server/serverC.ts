import EventEmitter from "events";
import * as net from 'net';
import * as fs from 'fs';
import { Note } from "./note";


/**
 * Tipo del mensaje que se enviara al cliente
 */
export type ResponseType = {
  type?: 'add' | 'update' | 'remove' | 'read' | 'list' ;
  success?: boolean;
  notes?: Note[];
}


/**
 * Clase servidor que deriva de EvenEmitter para simular el servidor
 */
export class servidor extends EventEmitter{
	/**
	 * constructor de la clase
	 */
	constructor(){
		super();
		const server = net.createServer((connect) => {
			this.run(connect)
		})
		server.listen(60300, () => {
			console.log('Esperando clientes.');
		});
	}
/**
 * metodo run para obtener los datos de los clientes
 * @param connection servidor
 */
	private run(connection: net.Socket){
		console.log("Se ha conectado un cliente");

		connection.on('close', () => {
			console.log('Se ha desconectado un cliente');
			});

		let allData = '';
		connection.on('data', (chunks) => {
			allData += chunks;

			if(allData.indexOf('\n') !== -1){
				connection.emit('respond', JSON.parse(allData));
			}
		});

		connection.on('respond', (Datos) => {
			let send_res: ResponseType = {};
			switch (Datos.type) {
				case 'add':
					send_res = this.Metodadd(Datos);
				break;
				case 'update':
					send_res = this.Metodupdate(Datos);
				break;
				case 'remove':
					send_res = this.Metodremove(Datos);
				break;
				case 'read':
					send_res = this.Metodread(Datos);
				break;
				case 'list':
					send_res = this.Metodlist(Datos);
				break;
			}
			connection.write(JSON.stringify(send_res));
			connection.end()
		})
	}


/**
 * Metodo add para crear una nueva nota
 * @param info datos para crear la nota	
 * @returns el mensaje de respuesta del servidor
 */
	private Metodadd(info: any): ResponseType {
		console.log("Metodo add");
		let respuesta: ResponseType;

		if (!fs.existsSync(`dataUsers/${info.user}`)) {
			console.log(`Se creara el directorio ${info.user}`);
			fs.mkdirSync(`dataUsers/${info.user}`, { recursive: true });
		}
		const note = new Note(info.title, info.body, info.color);
		if (!fs.existsSync(`dataUsers/${info.user}/${info.title}.json`)) {
			fs.writeFileSync(`dataUsers/${info.user}/${info.title}.json`, note.write());
			respuesta = {type: 'add', success: true} 
		} else {
			respuesta = {type: 'add', success: false} 
		}
		return respuesta;
	}


/**
 * Metodo para actualizaar una nota
 * @param info datos para actualizar la nota	
 * @returns el mensaje de respuesta del servidor
 */
	private Metodupdate(info: any): ResponseType{
		let resultado: ResponseType;

		console.log("Metodo modify");
		if (fs.existsSync(`dataUsers/${info.user}/${info.title}.json`)) {
			const note = new Note(info.title, info.body, info.color);
			fs.writeFileSync(`dataUsers/${info.user}/${info.title}.json`, note.write());
			resultado = {type: 'update', success: true};
		}
		else {
			resultado = {type: 'update', success: false};
		}
		return resultado;
	}


/**
 * Metodo para remover una nota
 * @param info datos para remover la nota	
 * @returns el mensaje de respuesta del servidor
 */
private Metodremove(info: any): ResponseType{
		let resultado: ResponseType;

		console.log("Metodo remove");
		if (fs.existsSync(`dataUsers/${info.user}/${info.title}.json`)) {
			fs.rmSync(`dataUsers/${info.user}/${info.title}.json`);
		resultado = {type: 'remove', success: true};
		}
		else {
			resultado = {type: 'remove', success: false};
		}
		return resultado;
	}

/**
 * Metodo para leer una nota
 * @param info datos para leer la nota	
 * @returns el mensaje de respuesta del servidor
 */
private Metodread(info: any): ResponseType{
		let resultado: ResponseType;

		if (fs.existsSync(`dataUsers/${info.user}/${info.title}.json`)) {
			const contentNote = fs.readFileSync(`dataUsers/${info.user}/${info.title}.json`);
			const JSONote = JSON.parse(contentNote.toString());
			const Nota = new Note(JSONote.title, JSONote.body, JSONote.color);
			resultado = {type: 'read', success: true, notes: [Nota]}
		} 
		else {
			resultado = {type: 'update', success: false};
		}

		return resultado;
	}

/**
 * Metodo para listar las notas del usuario
 * @param info datos para listar las notas
 * @returns el mensaje de respuesta del servidor
 */
private Metodlist(info: any): ResponseType{
		let resultado: ResponseType;

		console.log("Metodo list");
		if (fs.existsSync(`dataUsers/${info.user}`)) {
			let allNotes: Note[] = [];
			fs.readdirSync(`dataUsers/${info.user}`).forEach((notes) => {
				const contentNote = fs.readFileSync(`dataUsers/${info.user}/${notes}`);
				const JSONote = JSON.parse(contentNote.toString());
				const note = new Note(JSONote.title, JSONote.body, JSONote.color);
				allNotes.push(note);
			});
			resultado = {type: 'list', success: true, notes: allNotes}
		} 
		else {
			resultado = {type: 'list', success: false};
		}
		return resultado;
	}
}

const server = new servidor();