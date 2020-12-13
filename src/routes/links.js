const { query } = require('express');
const express = require('express');
const router = express.Router();
// todos los permisos para acceder a la database
const pool = require('../database')
// metodo para comprobar si esta logeado
const { isLoggedIn } = require('../lib/auth')


// rutea la url add y renderizar
router.get('/add', isLoggedIn, (req, res) => {
    res.render('links/add');
});

// -----------------------------------------------------------------------------

// configurar la peticion http POST y la consulta MySQL INSERT
router.post('/add', isLoggedIn, async (req, res) => {
    const { tittle, url, description } = req.body;
    const newLink = {
        tittle,
        url,
        description,
        user_id: req.user.id
    };
    await pool.query('INSERT INTO links set ?', [newLink]);
    req.flash('success', 'Link saved successfully');
    res.redirect('/links');
});

// -----------------------------------------------------------------------------

// renderizar la lista de links con una consulta MySQL
router.get('/', isLoggedIn, async (req, res) => {
    // R3CORDATORIO: CUIDADO CON ESCRIBIR MAL LAS COLUMNAS, users_id no existe, por eso me daba error, cambiar por user_id
    const links = await pool.query('SELECT * FROM links WHERE user_id = ?', [req.user.id]);
    console.log(links);
    res.render('./links/list', { links });
});

// -----------------------------------------------------------------------------

// redirigir a links despues de hacer la consulta MySQL DELETE
router.get('/delete/:id', isLoggedIn, async (req, res) => {
    const { id } = req.params;
    await pool.query('DELETE FROM links WHERE ID = ?', [id]);
    req.flash('success', 'Link Removed Successfully');
    res.redirect('/links');
})

// -----------------------------------------------------------------------------

// renderizar el link a editar cuando se requiera configurando la consulta MySQL
router.get('/edit/:id', isLoggedIn, async (req, res) => {
    const { id } = req.params;
    const links = await pool.query('SELECT * FROM links WHERE id = ?', [id]);
    res.render('links/edit', {link: links[0]})
});
// -----------------------------------------------------------------------------
// procesar los datos luego de que se envian cuando se hace la consulta MySQL UPDATE y redireccionar a 'links'
router.post('/edit/:id', isLoggedIn, async (req, res) => {
    const { id } = req.params;
    const { tittle, description, url } = req.body;
    const newLink = {
        tittle,
        description,
        url
    }
    await pool.query('UPDATE links set ? WHERE id = ?', [newLink, id]);
    req.flash('success', 'Link Updated Successfully');
    res.redirect('/links');
});
// -----------------------------------------------------------------------------

module.exports = router;
