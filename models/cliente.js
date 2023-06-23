//Importaciones necesarias
const sequelize = require('../database/config');
const Sequelize = require('sequelize');

const Cliente = sequelize.define('Cliente', {
    // atributos
    idCliente: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,  //se establece que es la clave primaria de la tabla
        unique: true
    },
    nombreCliente: {
        type: Sequelize.STRING,
        allowNull: false
    },
    apellidoCliente: {
        type: Sequelize.STRING,
        allowNull: false
    }, 
    dniCliente: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    emailCliente: {
        type: Sequelize.STRING,
        allowNull: true
    },
    telefonoCliente: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    numCliente: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    fechaBajaCliente: {
        type: Sequelize.DATEONLY,
        allowNull: true,
    },
    }, {
        timestamps: false,
        freezeTableName: true, 
    }
    );
    
    async () => {
        await Cliente.sync({ force: true }) /* al colocar force:true, vuelve a crear la tabla a pesar de que ya esté creada, es decir, la tabla se elimina y se vuelve a crear*/
    }

    module.exports = Cliente;

    