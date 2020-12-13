// modulos
const express = require('express');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const path = require('path');
const flash = require('connect-flash');
const session = require('express-session');
const MySQLStore = require('express-mysql-session');
const { database } = require('./keys')
const passport = require('passport')

// ---------------------------------------------------------------------------------------------------

// initializations
const app = express();
require('./lib/passport');

// ----------------------------------------------------------------------------------------

// settings
app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views'))
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layout'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    helpers: require('./lib/handlebars')
}))

app.set('view engine', '.hbs')
// -----------------------------------------------------------------------------

// MIDDLEWARES

// flash para enviar mensajes por medio de http
app.use(flash());
// necesario para usar flash
app.use(session({ cookie: { maxAge: 60000 }, 
    secret: 'woot',
    resave: false, 
    saveUninitialized: false,
    store: MySQLStore(database)
}));
//para mostrar mensajes en la consola
app.use(morgan('dev'));
//para que se puede leer solo las url, cambiar a true si se desea ampliar
app.use(express.urlencoded({
    extended: false
}));
// PARA USAR JSON
app.use(express.json());
// PARA INICIALIZAR PASSPORT
app.use(passport.initialize());
app.use(passport.session());
// -----------------------------------------------------------------------------

// Global Variables
app.use((req, res, next) => {
    app.locals.success = req.flash('success');
    app.locals.message = req.flash('message');
    app.locals.user = req.user;
    next();
});
// -----------------------------------------------------------------------------

// Routes

app.use(require('./routes'))
app.use(require('./routes/authentication'))
app.use('/links', require('./routes/links'));
//Cuidado con poner mal los moduloss :-(, para la proxima

// -----------------------------------------------------------------------------

// public
app.use(express.static(path.join(__dirname, 'public')));
// -----------------------------------------------------------------------------

// Starting the server
app.listen(app.get('port'), () =>{
    console.log('El servidor esta en el puerto', app.get('port'))
})
// -----------------------------------------------------------------------------