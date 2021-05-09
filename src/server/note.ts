/**
 * Clase que simula una nota
 */
 export class Note {
  /**
   * Constructor de la clase
   * @param title Titulo de la nota
   * @param body Contenido de la nota
   * @param color Color de la nota
   */
  constructor(private title: string, private body: string, private color: string) {
  }

/**
 * Se obtiene el titulo de la nota
 * @returns titulo de la nota
 */  
  public getTitle() : string {
    return this.title;
  }
  
  /**
   * Se obtiene el color de la nota
   * @returns Color de la nota
   */
  public getColor() : string {
    return this.color;
  }

  /**
   * Se obtiene el contenido de la nota
   * @returns Contenido de la nota
   */
  public getBody() : string {
    return this.body;
  }

  /**
   * Escribir la nota en formato JSON
   * @returns Nota en formato JSON
   */
  public write():string {
    return '{\n\"title\": \"' + this.title + '\",\n\"body\": \"'+ this.body +
    '\",\n\"color\": \"' + this.color + '\"\n}';
  }
  
}
