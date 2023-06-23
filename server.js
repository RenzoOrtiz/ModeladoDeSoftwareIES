//Importaciones necesarias
const express = require('express');
const path = require('path');

// Allowed extensions list can be extended depending on your own needs
class Server {

    /*se crean las rutas a utilizar para las distintas clases*/
    constructor() {
        this.app = express();
        this.port = process.env.PORT;//3000;
        this.cliente = '/api/cliente';
        this.app.use(express.json());

        // Rutas de mi aplicación
        this.rutas();
    }

    rutas() {
        this.app.use(this.cliente, require('./routes/cliente'))
    }

    //Se indica el puerto en donde está corriendo la aplicación
    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto', this.port);
        });
    }

    /*
    // Se llama al objeto que inicializa las clases necesarias como los perfiles y permisos al iniciar la base de datos
    dbinit;
    */
}

module.exports = Server;
