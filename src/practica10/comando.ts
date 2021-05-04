

/**
 * Clase comando
 */

export class Comando {
  /**
   * Constructor de la clase
   * @param nombre nombre del comando
   * @param opt opciones del comando
   */
  constructor(public nombre: string, public opt: string) {

  }

  /**
   * Escribir en formato JSON
   * @returns cadena de caracteres en formato JSON
   */
  public write():string {
    return '{\n\"title\": \"' + this.nombre + '\",\n\"body\": \"'+ this.opt + '\"\n}';
  }
}
