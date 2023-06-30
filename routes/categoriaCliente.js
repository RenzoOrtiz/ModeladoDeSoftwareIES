//Importaciones necesarias
const { Router } = require('express');
const { categoriaClienteGet, categoriaClientePost, categoriaClientePut, categoriaClienteDelete, categoriasDeClientePorFecha } = require('../controllers/categoriaCliente');

const router = Router();

//realizo las validaciones correspondientes a los distintos métodos y le asigno la parte final de la ruta

//categoriaCliente
router.get('/categoriaClienteGet', categoriaClienteGet );
router.post('/categoriaClientePost', categoriaClientePost );
router.put('/categoriaClientePut', categoriaClientePut );
router.delete('/categoriaClienteDelete', categoriaClienteDelete );

router.get('/categoriasDeClientePorFecha', categoriasDeClientePorFecha );

module.exports = router;