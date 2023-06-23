//Importaciones de librerías y clases necesarias
const { request, response } = require('express');
//const nanoid = require('nanoid');
const moment = require('moment');
const Categoria = require('../models/categoria');
//const bcryptjs = require('bcrypt');
//const Perfil = require('../models/perfil');
//const { crearUsuarioNotificacion } = require('./notificacion');
//const JWT = require("jsonwebtoken");
//const { Op } = require("sequelize");
//const nodemailer = require('nodemailer');
//const _ = require('lodash');

//Se crea un categoria a través de una solicitud "post" enviando en el body de la solicitud los parametros necesarios.
const categoriaPost = async (req = request, res = response) => {
    try {
        const postCategoria = new Categoria({
            "idCategoria": req.body.idCategoria,//nanoid.nanoid(),
            "nombreCategoria": req.body.nombreCategoria,
            "fechaBajaCategoria": null,
        })
        await postCategoria.save()

        res.json({ cliente: postCategoria })

    } catch (error) {
        console.error(error)
    }
}

//Se devuelve a través de una solicitud "get" todos las categorias existentes, siempre y cuando no hayan sido dados de baja.
const categoriaGet = async (req = request, res = response) => {
    try {
        const getCategoria = await Categoria.findAll({
            where: {
                fechaBajaCategoria: null
            }
        })
        res.json({ getCategoria })

    } catch (error) {
        console.error(error)
    }
    
}

//Se modifica a través de una solicitud "put" las categorias con el id que viene en el body.
const categoriaPut = async (req = request, res = response) => {
    try {
        const putCategoria = await Categoria.update({
            nombreCategoria: req.body.nombreCategoria,
            fechaBajaCategoria: req.body.fechaBajaCategoria         
        },
            {
                where: {
                    idCategoria: req.body.idCategoria
                },
                returning: true,
                plain: true
            })
        res.json({ categoria: putCategoria[1] })

    } catch (error) {
        console.error(error)
    }
}

//Se da de baja través de una solicitud "delete" una categoria determinada, el "Id" de la categoria a eliminar llega en los parametros de la solicitud.
const categoriaDelete = async (req = request, res = response) => {
    try {
        const deleteCategoria = await Categoria.update({
            fechaBajaCategoria: moment(new Date(), 'DD-MM-YYYY')
        },
            {
                where: {
                    idCategoria: req.body.idCategoria
                },
                returning: true,
                plain: true
            })
        res.json({ usuario: deleteCategoria[1] })

    } catch (error) {
        console.error(error)
    }
}


//Se exportan los métodos a utilizar
module.exports = {
    categoriaPost,
    categoriaGet,
    categoriaPut,
    categoriaDelete
}