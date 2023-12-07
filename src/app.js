const express = require('express');
const path = require('path');
const methodOverride =  require('method-override');
const multer = require('multer');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const app = express();

app.use(session({ secret: "SECRET" , resave: false, saveUninitialized: false})); //resave y saveUninitialized están deprecados por eso quedan en false
app.use(cookieParser())

app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  const rememberUser = req.cookies.rememberUser;

  if (rememberUser) {
      const users = getUsers();
      const user = users.find((user) => user.email === rememberUser);
  
      if (user) {
          req.session.user = {
              email: user.email,
          };
      }
  }
  next();
});

passport.use(new LocalStrategy(
  function(username, password, done) {

    User.findOne({ username: username }, function(err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Usuario no encontrado' });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Contraseña incorrecta' });
      }
      return done(null, user);
    });
  }
));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  done(null, user);
});

app.use(express.static(path.resolve(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(methodOverride('_method')); 

function isLoggedMiddleware(req, res, next) {
  if (!req.session.user) {
    if (req.originalUrl === '/user/login') {
        return next();
    }
    return res.redirect('/user/login');
}
next();
}

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

const upload = require('../src/config/multerConfig');

const mainRoutes = require('./routes/main');
const productRoutes = require('./routes/product');
const usersRoutes = require('./routes/users');

app.use('/', mainRoutes);
app.use('/product', productRoutes);
app.use('/user', isLoggedMiddleware, usersRoutes);

const port = 3030;
app.listen(port, () => {
    console.log(`Servidor iniciado en http://localhost:${port}`);
});

