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

Para la practica tendremos que usar dos terminales una que funcione como cliente y otra como servidor, usaremos los **sockets** para interactuar entre ellas y que asi el cliente pueda enviar las peticiones al servidor por linea de comandos y el servidor le responda si se hizo efectiva o no la solicitud.

---------------------

## Desarrollo<a name="desarrollo"></a>

### Fichero ClientC

En este fichero tendremos un **type RequestType** que sera el mensaje que el cliente envia al servidor para que se procece. Tambien se encuentra la Clase **Cliente** que se usa para crear el socket cliente que se conectara al servidor donde con el metodo **run** que se le pasa el cliente por parametro se ira obteniendo la data en el wholeData. Se procesa esa información que se transforma en *JSON*, ya con esto podemos acceder a cada elemento de la información y dependiendo del *type* que sea, se accede al elemento *success* para ver si se realizo la consulta satisfactoriamente y en tal caso se muestra por cosola que se realizo correctamente. Por ultimo tendremos el método **request** que simplemente se le pasa la petición para crear el cliente y enviar la información al servidor y además invoca al metodo **run**.


Aquí se indican los enlaces para ver el contenido de la clase Note y sus respectivas pruebas.

[Clase Note](https://github.com/ULL-ESIT-INF-DSI-2021/ull-esit-inf-dsi-20-21-prct08-filesystem-notes-app-Nitro1000/blob/main/src/note.ts)

[Pruebas de la clase](https://github.com/ULL-ESIT-INF-DSI-2021/ull-esit-inf-dsi-20-21-prct08-filesystem-notes-app-Nitro1000/blob/main/tests/note.spec.ts)


---------------------

### Fichero serverC

En este fichero tendremos un **type ResponseType** que sera el mensaje que el servidor envia al cliente para que se procece. Tambien se encuentra la clase **Servidor** que se usa para crear el socket servidor que estara a la escucha esperando que se conecte un cliente. Para comenzar tendremos en el constructor se crea el objeto *server* que se le pasara al método **run** de la clase para que el servidor empiece a recibir las peticiones y las procese. Se empiza reuniendo toda la data en allData y se comprueba que el final de allData sea un **/n** para demilitar cada menseaje que recibe el servidor. En el caso de que se encuentre el **/n** se usa el **emit**.

Luego se va procesando la infomación que recibe el servidor y dependiendo del type del JSON ,que contendrá el comando que se quiere ejecutar, se ejecutara su respectivo comando que se comportara de la misma forma que en la practica 8. Cada metodo que representa un comando retornara un **ResponseType** que se enviara en al cliente mediante **connection.write(JSON.stringify(send_res));**

Aquí se indican los enlaces para ver el contenido de la Fichero serverC y sus respectivas pruebas.

[Fichero serverC](https://github.com/ULL-ESIT-INF-DSI-2021/ull-esit-inf-dsi-20-21-prct08-filesystem-notes-app-Nitro1000/blob/main/src/note-app.ts)

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
    if (typeof argv.user === 'string' && typeof argv.title === 'string' && typeof argv.body === 'string' && typeof argv.color === 'string') {
      peticion = {type: 'add', user: argv.user, title: argv.title, body: argv.body, color: argv.color};
    }
  },
});
```

Con *command* le damos un nombre al comando, con *describe* damos una breve descripción del comando y con *builder* definimos los argumentos del comando en este caso seran: *user*,*title*,*body* y *color*. Cada argumento tendra una breve descripción, el tipo del argumento y el *demandOption* se usa para especificar que el argumento es obligatorio. 

Por ultimo en cada handler se crea la peticion que el cliente enviara al servidor con cada argumento que se le pasa al comando respectivo.

Aquí se indican el enlace para ver el contenido del fichero command.ts .

[Fichero Command](https://github.com/ULL-ESIT-INF-DSI-2021/ull-esit-inf-dsi-20-21-prct08-filesystem-notes-app-Nitro1000/blob/main/src/command.ts)


---------------------

## Conclusión<a name="conclu"></a>

Gracias a esta practica pude experimentar con los **sockets** que sin duda han sido la herramienta mas complicada de entender hasta ahora. Tuve muchos problemas para entenderlos y acudi a tutorias pero cuando resolvia una duda y podia seguir con la practica se me presentaba otro problema. A pesar de todo pude resolver la practica, pero no consegui hacer funcionar los test con clases, sin clases si pude hacer algo parecido a lo que el profesorado tenia en los apuntes, pero con clases no entendia como hacerlo. El resto de los problemas los pudes solventar gracias a las tutorias. La practica fue muy entretenida y pude aprender muchos conceptos nuevos.

---------------------

## Bibliografía <a name="biblio"></a>

- [TypeDoc](https://typedoc.org/)
- [Mocha](https://mochajs.org/)
- [Chai](https://www.chaijs.com/)
- [Istanbul](https://istanbul.js.org/)
- [Coveralls](https://coveralls.io/)
- [Sonar Cloud](https://sonarcloud.io/)
- [Guión de la práctica](https://ull-esit-inf-dsi-2021.github.io/prct10-async-sockets/)