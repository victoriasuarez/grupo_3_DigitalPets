const express = require('express');
const path = require('path');
const methodOverride =  require('method-override');
const multer = require('multer');
const session = require('express-session');
const cookieParser = require('cookie-parser')

const app = express();

app.use(express.static(path.resolve(__dirname, 'public')))
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(methodOverride('_method')); 
app.use(session({ secret: "SECRET" , resave: false, saveUninitialized: false})); //resave y saveUninitialized están deprecados
app.use(cookieParser())
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


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

const upload = require('../src/config/multerConfig');

const mainRoutes = require('./routes/main');
const productRoutes = require('./routes/product');
const usersRoutes = require('./routes/users');

app.use('/', mainRoutes);
app.use('/product', productRoutes);
app.use('/user', usersRoutes);


const port = 3030;
app.listen(port, () => {
    console.log(`Servidor iniciado en http://localhost:${port}`);
});

