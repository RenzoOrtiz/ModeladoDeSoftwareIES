//Importaciones necesarias
const sequelize = require('../database/config');
const Sequelize = require('sequelize');

const Categoria = sequelize.define('Categoria', {
    // atributos
    idCategoria: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,  //se establece que es la clave primaria de la tabla
        unique: true
    },
    nombreCategoria: {
        type: Sequelize.STRING,
        allowNull: false
    },
    fechaBajaCategoria: {
        type: Sequelize.DATEONLY,
        allowNull: true,
    },
    }, {
        timestamps: false,
        freezeTableName: true, 
    }
    );
    
    async () => {
        await Categoria.sync({ force: true }) /* al colocar force:true, vuelve a crear la tabla a pesar de que ya esté creada, es decir, la tabla se elimina y se vuelve a crear*/
    }

    module.exports = Categoria;

    