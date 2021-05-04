# Práctica 8 - Aplicación de procesamiento de notas de texto

| Apellidos | Nombre |
| ------ | ------ |
| Rivas Quintero| Milton Daniel |

## Índice

1. [Introducción](#intro)
2. [Desarrollo](#desarrollo)
3. [Conclusión](#conclu)
4. [Bibliografía](#biblio)

---------------------

## Introducción<a name="intro"></a>

En esta practica se va a desarrollar una aplicacion con la cual vamos a poder añadir, modificar, eliminar, listar y leer notas de un usuario concreto. Para interactuar con ella tendremos que usar la linea de comandos y para eso usaremos un paquete llamado **yargs**, que se programara de tal forma que el usuario dandole unos parametros a la placacion esta realizara las tareas que desea el usuario. Usaremos otro paquete llamado **chalk** para, por decirlo de alguna manera "embellecer" los resultados de la palicacion.

Esta sera la primera vez que se trabaja con API, en concreto usremos la API sincrona proporcianada por **Node.js** para trabajar con el sistema de ficheros, ya que cuenta con muchas funciones interesantes para el manejo de estos elementos.

---------------------

## Desarrollo<a name="desarrollo"></a>

### Clase Note

Comence creando la clase Note la cual simplemente se encargara de tener los atributos (*title*,*body*,*color*) y metodos necesarios para representar una nota. Cotara con sus respectivos *getters* y ademas tendra un metodo de escritura *write* que nos ayuda meter la información en el fichero **.JSON** del usuario. 


Aquí se indican los enlaces para ver el contenido de la clase Note y sus respectivas pruebas.

[Clase Note](https://github.com/ULL-ESIT-INF-DSI-2021/ull-esit-inf-dsi-20-21-prct08-filesystem-notes-app-Nitro1000/blob/main/src/note.ts)

[Pruebas de la clase](https://github.com/ULL-ESIT-INF-DSI-2021/ull-esit-inf-dsi-20-21-prct08-filesystem-notes-app-Nitro1000/blob/main/tests/note.spec.ts)


---------------------

### Clase NoteApp

Esta es la clase principal donde se implementan cada comando que sera usado posteriormente en la configuración del **yargs**. Tendra los siguientes metodos:

- *addNote*: Nos permite añadir una nueva nota. Lo primero que hacemos es comporbar si el directorio esta creado, si no esta creado se creara con el nombre del usuario. Luego se comprueba si existe el fichero *.JSON* del usuario con el mismo nombre de la nota creada, en caso afirmativo se muestra un mensaje de error, en caso negativo se creara el fichero correspondiente con el nombre de la nota, y en ella se almacenara la información de dicha nota.
- *listNote*: Nos permite ver las notas del usuario especificado. Se recorre el directorio del usuario y vamos obteniendo cada una de sus notas y accediendo a la información de ellas en formato *.JSON* creamos nuevas notas y la  almacenamos en un array que luego sera lo que retorne este metodo.
- *removeNote*: Nos permite eliminar una nota. Si la nota que se eliminara exite, se elimina el fichero con **rmSync**, en caso contrario se muestra un mensaje de error.
- *modifyNote*: Nos permite modificar una nota que este creada simplemente se crea otra nota y se sobreescribe la nota anterior. En caso de que la nota no este creada da error.
- *readNote*: Nos permite mostrar el contenido de la nota. Si existe la nota solicitada se accede al fichero *.JSON* y obtenemos los datos. Con los datos creamos una nota y mostramos su titulo y su contenido. Si no existe se muestra un error.

Aquí se indican los enlaces para ver el contenido de la clase NoteApp y sus respectivas pruebas.

[Clase NoteApp](https://github.com/ULL-ESIT-INF-DSI-2021/ull-esit-inf-dsi-20-21-prct08-filesystem-notes-app-Nitro1000/blob/main/src/note-app.ts)

[Pruebas de la clase](https://github.com/ULL-ESIT-INF-DSI-2021/ull-esit-inf-dsi-20-21-prct08-filesystem-notes-app-Nitro1000/blob/main/tests/note-app.spec.ts)


---------------------

### Fichero Command

En este fichero se configurara el **yargs** de tal forma que podamos invocar a la aplicación con los argumentos. En general la estructura de cada comando es muy parecida, en este caso se usara de ejemplo el comando **add**:

```typescript
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
```
Con *command* le damos un nombre al comando, con *describe* damos una breve descripción del comando y con *builder* definimos los argumentos del comando en este caso seran: *user*,*title*,*body* y *color*. Cada argumento tendra una breve descripción, el tipo del argumento y el *demandOption* se usa para especificar que el argumento es obligatorio.

Aquí se indican el enlace para ver el contenido del fichero command.ts .

[Fichero Command](https://github.com/ULL-ESIT-INF-DSI-2021/ull-esit-inf-dsi-20-21-prct08-filesystem-notes-app-Nitro1000/blob/main/src/command.ts)


---------------------

## Conclusión<a name="conclu"></a>

Gracias a esta practica pude experimentar con una de las API de Node.js, la cual resulto ser muy util y completa. Ademas usamos **yargs** que a mi parecer es una de las herramientas que mas curiosidad me han dado, ya que no sabia que con **JS** se podia utilizar la consola de esa forma, como en lenguajes como **C++**. Las principales dificultades fue a la hora de usar la API, ya que no habia usado nunca una, pero gracias a la documentación pude comprender lo suficiente para realizar las tareas planteadas en la practica.

---------------------

## Bibliografía <a name="biblio"></a>

- [TypeDoc](https://typedoc.org/)
- [Mocha](https://mochajs.org/)
- [Chai](https://www.chaijs.com/)
- [Istanbul](https://istanbul.js.org/)
- [Coveralls](https://coveralls.io/)
- [Sonar Cloud](https://sonarcloud.io/)
- [Guión de la práctica](https://ull-esit-inf-dsi-2021.github.io/prct08-filesystem-notes-app/)