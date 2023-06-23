//Importaciones de librerías y clases necesarias
const { request, response } = require('express');
//const nanoid = require('nanoid');
const Cliente = require('../models/cliente');
const moment = require('moment');
//const bcryptjs = require('bcrypt');
//const Perfil = require('../models/perfil');
//const { crearUsuarioNotificacion } = require('./notificacion');
//const JWT = require("jsonwebtoken");
//const { Op } = require("sequelize");
//const nodemailer = require('nodemailer');
//const _ = require('lodash');

//Se crea un cliente a través de una solicitud "post" enviando en el body de la solicitud los parametros necesarios.
const clientePost = async (req = request, res = response) => {
    try {
        const postCliente = new Cliente({
            "idCliente": req.body.idCliente,//nanoid.nanoid(),
            "nombreCliente": req.body.nombreCliente,
            "apellidoCliente": req.body.apellidoCliente,
            "dniCliente": req.body.dniCliente,
            "emailCliente": req.body.emailCliente,
            "telefonoCliente": req.body.telefonoCliente,
            "numCliente": req.body.numCliente,
            "fechaBajaCliente": null,
        })
        await postCliente.save()

        res.json({ cliente: postCliente })

    } catch (error) {
        console.error(error)
    }
}

//Se devuelve a través de una solicitud "get" todos los clientes existentes, siempre y cuando no hayan sido dados de baja.
const clienteGet = async (req = request, res = response) => {
    try {
        const postCliente = await Cliente.findAll({
            where: {
                fechaBajaCliente: null
            }
        })
        res.json({ postCliente })

    } catch (error) {
        console.error(error)
    }
    
}

//Se modifica a través de una solicitud "put" los clientes con el id que viene en el body.
const clientePut = async (req = request, res = response) => {
    try {
        const putCliente = await Cliente.update({
            emailCliente: req.body.emailCliente,
            telefonoCliente: req.body.telefonoCliente, 
            fechaBajaCliente: req.body.fechaBajaCliente         
        },
            {
                where: {
                    idCliente: req.body.idCliente
                },
                returning: true,
                plain: true
            })
        res.json({ cliente: putCliente[1] })

    } catch (error) {
        console.error(error)
    }
}

//Se da de baja través de una solicitud "delete" un cliente determinado, el "Id" del usuario a eliminar llega en los parametros de la solicitud.
const clienteDelete = async (req = request, res = response) => {
    try {
        const deleteCliente = await Cliente.update({
            fechaBajaCliente: moment(new Date(), 'DD-MM-YYYY')
        },
            {
                where: {
                    idCliente: req.body.idCliente
                },
                returning: true,
                plain: true
            })
        res.json({ usuario: deleteCliente })

    } catch (error) {
        console.error(error)
    }
}


//Se exportan los métodos a utilizar
module.exports = {
    clientePost,
    clienteGet,
    clientePut,
    clienteDelete
}