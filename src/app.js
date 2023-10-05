const express = require('express');
const path = require('path');

const mainRoutes = require('./routes/main');

const productRoutes = require('./routes/product');

const usersRoutes = require('./routes/users');

const app = express();

app.use(express.static(path.resolve(__dirname, 'public')))

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.use('/', mainRoutes);
app.use('/product', productRoutes);
app.use('/user', usersRoutes);

const port = 3030;
app.listen(port, () => {
    console.log(`Servidor iniciado en http://localhost:${port}`);
});

