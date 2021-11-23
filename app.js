var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var flash = require('express-flash');
var passport = require('./lib/passport');
var cors = require('cors');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var register = require('./routes/register');
var login = require('./routes/login');
const home = require('./routes/home');
var logout = require('./routes/logout');
var profile = require('./routes/profile')

var app = express();
var swaggerJsDoc = require('swagger-jsdoc')
var swaggerUI = require('swagger-ui-express')

const swaggerOptions = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "Game Platform Master API",
        version: "1.0.0",
        description: "A simple documentation API"
      },
      servers: [
        {
          url: "http://localhost:3000"
        }
      ],
    },
    apis: ["./routes/*.js"]
  };
  
const swaggerSpecs = swaggerJsDoc(swaggerOptions)
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpecs))
  

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    secret : 'Buat ini jadi rahasia',
    resave : false,
    saveUninitialized : false
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

app.set('view engine', 'ejs');

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/users/:id', usersRouter);

app.use('/register', register);
app.use('/login', login);
app.use('/home', home);
app.use('/profile', profile)
app.use('/logout', logout);

module.exports = app;
