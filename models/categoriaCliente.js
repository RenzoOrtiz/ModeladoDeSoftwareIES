//Importaciones necesarias
const sequelize = require('../database/config');
const Sequelize = require('sequelize');


const CategoriaCliente = sequelize.define('CategoriaCliente', {
    // atributos
    idCategoriaCliente: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,  //se establece que es la clave primaria de la tabla
        unique: true
    },
    fkCategoriaClienteCliente: {
        type: Sequelize.STRING,
        allowNull: false,
        foreingKey: true  
    },
    fkCategoriaClienteCategoria: {
        type: Sequelize.STRING,
        allowNull: false,
        foreingKey: true
    },
    fechaInicioCategoriaCliente: {
        type: Sequelize.DATEONLY,
        allowNull: true,
    },
    fechaFinCategoriaCliente: {
        type: Sequelize.DATEONLY,
        allowNull: true,
    },
    fechaBajaCategoriaCliente: {
        type: Sequelize.DATEONLY,
        allowNull: true,
    },
    }, {
        timestamps: false,
        freezeTableName: true, 
    }
    );
    
    async () => {
        await CategoriaCliente.sync({ force: true }) /* al colocar force:true, vuelve a crear la tabla a pesar de que ya esté creada, es decir, la tabla se elimina y se vuelve a crear*/
    }


    module.exports = CategoriaCliente;

    