//Importaciones necesarias
const { Router } = require('express');
const { categoriaGet, categoriaPost, categoriaPut, categoriaDelete } = require('../controllers/categoria');

const router = Router();

//realizo las validaciones correspondientes a los distintos métodos y le asigno la parte final de la ruta

//cliente
router.get('/categoriaGet', categoriaGet );
router.post('/categoriaPost', categoriaPost );
router.put('/categoriaPut', categoriaPut );
router.delete('/categoriaDelete', categoriaDelete );

module.exports = router;