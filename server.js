//Importaciones necesarias
const express = require('express');
const path = require('path');

// Allowed extensions list can be extended depending on your own needs
class Server {

    /*se crean las rutas a utilizar para las distintas clases*/
    constructor() {
        this.app = express();
        this.port = process.env.PORT;//3000;
        this.alumno = '/api/alumno';
        this.app.use(express.json());

        // Rutas de mi aplicación
        this.rutas();
    }

    rutas() {
        this.app.use(this.alumno, require('./rutas/alumno'))
    }

    //Se indica el puerto en donde está corriendo la aplicación
    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto', this.port);
        });
    }

}

module.exports = Server;
