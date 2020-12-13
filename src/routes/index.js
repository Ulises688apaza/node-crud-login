const express = require('express');
const router = express.Router();


const routes = express.Router();


// ruta al inicio de la aplicacion
router.get('/', (req, res) => {
    res.render('index')
})

module.exports = router;