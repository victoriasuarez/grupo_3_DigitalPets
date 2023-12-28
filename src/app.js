require('dotenv').config();
const express = require("express");
const path = require("path");
const methodOverride = require("method-override");
const multer = require("multer");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require('bcrypt');
const upload = require("../src/config/multerConfig");
const mainRoutes = require("./routes/main");
const productsRoutes = require("./routes/products");
const usersRoutes = require("./routes/users");
const flash = require("express-flash");

const app = express();

app.use(session({ secret: "SECRET", resave: false, saveUninitialized: false })); //resave y saveUninitialized están deprecados por eso quedan en false
app.use(flash());
app.use(cookieParser());

app.use(passport.initialize());
app.use(passport.session());

// app.use((req, res, next) => {
//   const rememberUser = req.cookies.rememberUser;

//   if (rememberUser) {
//     const users = getUsers();
//     const user = users.find((user) => user.email === rememberUser);

//     if (user) {
//       req.session.user = {
//         email: user.email,
//       };
//     }
//   }
//   next();
// });

passport.use(
  new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
    const users = getUsers();
    const user = users.find((user) => user.email === email);

    if (!user) {
      return done(null, false, { message: 'Usuario no encontrado' });
    }

    bcrypt.compare(password, user.password, (err, result) => {
      if (err) {
        return done(err);
      }

      if (result) {
        return done(null, user);
      } else {
        return done(null, false, { message: 'Contraseña incorrecta' });
      }
    });
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  const users = getUsers();
  const user = users.find((user) => user.id === id);

  if (!user) {
    return done(new Error('User not found'), null);
  }

  done(null, user);
});

app.use(express.static(path.resolve(__dirname, "public")));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(methodOverride("_method"));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use("/", mainRoutes);
app.use("/products", productsRoutes);
app.use("/users", usersRoutes);

const port = 3030;
app.listen(port, () => {
  console.log(`Servidor iniciado en http://localhost:${port}`);
});
