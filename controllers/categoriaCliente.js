//Importaciones de librerías y clases necesarias
const { request, response } = require('express');
//const nanoid = require('nanoid');
const CategoriaCliente = require('../models/categoriaCliente');
const Cliente = require('../models/cliente');
const Categoria = require('../models/categoria');

const moment = require('moment');
//const bcryptjs = require('bcrypt');
//const Perfil = require('../models/perfil');
//const { crearUsuarioNotificacion } = require('./notificacion');
//const JWT = require("jsonwebtoken");
//const { Op } = require("sequelize");
//const nodemailer = require('nodemailer');
//const _ = require('lodash');

//Se crea una categoriaCliente a través de una solicitud "post" enviando en el body de la solicitud los parametros necesarios.
const categoriaClientePost = async (req = request, res = response) => {
    try {
        const postCategoriaCliente = new CategoriaCliente({
            "idCategoriaCliente": req.body.idCategoriaCliente,//nanoid.nanoid(),
            "fechaInicioCategoriaCliente": req.body.fechaInicioCategoriaCliente,
            "fechaFinCategoriaCliente": req.body.fechaFinCategoriaCliente,
            "fkCategoriaClienteCliente": req.body.fkCategoriaClienteCliente,
            "fkCategoriaClienteCategoria": req.body.fkCategoriaClienteCategoria,
            "fechaBajaCategoriaCliente": null,
        })
        await postCategoriaCliente.save()

        res.json({ cliente: postCategoriaCliente })

    } catch (error) {
        console.error(error)
    }
}

//Se devuelve a través de una solicitud "get" todos las categoriaCliente existentes, siempre y cuando no hayan sido dados de baja.
const categoriaClienteGet = async (req = request, res = response) => {
    try {
        const postCategoriaClienteGet = await CategoriaCliente.findAll({
            where: {
                fechaBajaCategoriaCliente: null
            }
        })
        res.json({ categoriaCliente: postCategoriaClienteGet })

    } catch (error) {
        console.error(error)
    }
    
}

//Se modifica a través de una solicitud "put" los categoriaCliente con el id que viene en el body.
const categoriaClientePut = async (req = request, res = response) => {
    try {
        const putCategoriaCliente = await CategoriaCliente.update({
            fechaFinCategoriaCliente: req.body.fechaFinCategoriaCliente, 
            fechaBajaCategoriaCliente: req.body.fechaBajaCategoriaCliente         
        },
            {
                where: {
                    idCategoriaCliente: req.body.idCategoriaCliente
                },
                returning: true,
                plain: true
            })
        res.json({ cliente: putCategoriaCliente[1] })

    } catch (error) {
        console.error(error)
    }
}

//Se da de baja través de una solicitud "delete" un categoriaCliente determinado, el "Id" del categoriaCliente a eliminar llega en los parametros de la solicitud.
const categoriaClienteDelete = async (req = request, res = response) => {
    try {
        const deleteCategoriaCliente = await CategoriaCliente.update({
            fechaBajaCategoriaCliente: moment(new Date(), 'DD-MM-YYYY')
        },
            {
                where: {
                    idCategoriaCliente: req.body.idCategoriaCliente
                },
                returning: true,
                plain: true
            })
        res.json({ usuario: deleteCategoriaCliente })

    } catch (error) {
        console.error(error)
    }
}

//Se devuelve a través de una solicitud "get" todos las categoriaCliente existentes, siempre y cuando no hayan sido dados de baja.
const categoriasDeClientePorFecha = async (req = request, res = response) => {
    try {

        const cliente = await Cliente.findOne({
            where: {
                numCliente: req.body.numCliente,
                fechaBajaCliente: null
            }
        })
        console.log("Cliente:" )
        console.log(cliente)

        const categoriasClientes = await CategoriaCliente.findAll({
            where: {
                fkCategoriaClienteCliente: cliente.dataValues.idCliente,
                fechaBajaCategoriaCliente: null,
            }
        })
        console.log("Cambios de categoria que ha tenido el cliente:" )
        console.log(categoriasClientes)        

        let categoriaDelCliente
        for (i in categoriasClientes) {
            if ((categoriasClientes[i].dataValues.fechaInicioCategoriaCliente <= req.body.fechaCambio) && (categoriasClientes[i].dataValues.fechaFinCategoriaCliente >= req.body.fechaCambio)){
                categoriaDelCliente = categoriasClientes[i];
            }
        }
        console.log("Cambio de categoria que coincide con la fecha:" )
        console.log(categoriaDelCliente)

        const categoria = await Categoria.findOne({
            where: {
                idCategoria: categoriaDelCliente.fkCategoriaClienteCategoria,
                fechaBajaCategoria: null
            }
        })
        console.log("Categoria que tenia al momento de la fecha:" )
        console.log(categoria)

        res.json({ categoria: categoria})

    } catch (error) {
        console.error(error)
    }
    
}



//Se exportan los métodos a utilizar
module.exports = {
    categoriaClientePost,
    categoriaClienteGet,
    categoriaClientePut,
    categoriaClienteDelete,
    categoriasDeClientePorFecha
}