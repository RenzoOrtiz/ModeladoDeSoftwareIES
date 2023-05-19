//Importaciones necesarias
const { Router } = require('express');
const { alumnoGet } = require('../controladores/alumno');

const router = Router();

//realizo las validaciones correspondientes a los distintos métodos y le asigno la parte final de la ruta

router.get('/', alumnoGet );

module.exports = router;