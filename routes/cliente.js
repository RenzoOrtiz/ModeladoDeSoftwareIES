//Importaciones necesarias
const { Router } = require('express');
const { clienteGet, clientePost, clientePut, clienteDelete } = require('../controllers/cliente');

const router = Router();

//realizo las validaciones correspondientes a los distintos métodos y le asigno la parte final de la ruta

//cliente
router.get('/clienteGet', clienteGet );
router.post('/clientePost', clientePost );
router.put('/clientePut', clientePut );
router.delete('/clienteDelete', clienteDelete );

module.exports = router;