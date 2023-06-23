//Importaciones necesarias
const { Router } = require('express');
const { categoriaClienteGet, categoriaClientePost, categoriaClientePut, categoriaClienteDelete } = require('../controllers/categoriaCliente');

const router = Router();

//realizo las validaciones correspondientes a los distintos métodos y le asigno la parte final de la ruta

//cliente
router.get('/categoriaClienteGet', categoriaClienteGet );
router.post('/categoriaClientePost', categoriaClientePost );
router.put('/categoriaClientePut', categoriaClientePut );
router.delete('/categoriaClienteDelete', categoriaClienteDelete );

module.exports = router;