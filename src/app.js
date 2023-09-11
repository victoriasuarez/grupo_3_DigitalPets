const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(path.resolve(__dirname,'public')))


app.get('/', (req,res) => {
    res.sendFile(path.resolve(__dirname,'views/index.html'));
});

app.get('/productDetail', (req,res) => {
    res.sendFile(path.resolve(__dirname,'views/productDetail.html'));
});

app.get('/productCart', (req,res) => {
    res.sendFile(path.resolve(__dirname,'views/productCart.html'));
});

app.get('/register', (req,res) => {
    res.sendFile(path.resolve(__dirname,'views/register.html'));
});

app.get('/login', (req,res) => {
    res.sendFile(path.resolve(__dirname,'views/login.html'));
});


const port = 3000;
app.listen(port, ()=>{
    console.log(`Servidor iniciado en http://localhost:${port}`);
});

