const express = require('express');
const { route } = require('./links');
const router = express.Router();
const passport = require('passport');
const { isLoggedIn, isNotLoggedIn } = require('../lib/auth');

// renderizar signin para iniciar sesion
router.get('/signin', isNotLoggedIn, (req, res ) =>{
    res.render('./auth/signin')
});
// -----------------------------------------------------------------------------

// captar los datos y autenticar por passport
router.post('/signin', isNotLoggedIn, (req, res, next) => {
    passport.authenticate('local.signin', {
        successRedirect: '/profile',
        failureRedirect: '/signin',
        failureFlash: true
    })(req, res, next);
});
// -----------------------------------------------------------------------------

// renderizar la view signup
router.get('/signup', isNotLoggedIn, (req, res) =>{
    res.render('./auth/signup');
});
// -----------------------------------------------------------------------------

// captar los datos recibidos por el form dentro de signup y redireccionar
router.post('/signup', isNotLoggedIn, passport.authenticate('local.signup', {
    successRedirect: '/profile',
    failedRedirect: '/signup',
    failureFlash : true
}));
// -----------------------------------------------------------------------------

// renderizar profile
router.get('/profile', isLoggedIn, (req, res) => {
    res.render('./profile')
});
// -----------------------------------------------------------------------------

// ruta  para cerrar sesión
router.get('/logout', isLoggedIn, (req, res) => {
    req.logOut();
    res.redirect('/signin')

})

module.exports = router;