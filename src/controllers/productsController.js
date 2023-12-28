const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/products.json');

function getProducts() {
    const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
    return products;
}

function getProductById(productId) {
    const products = getProducts();
    return products.find(product => product.id == productId);
}

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const categories = [
    {
        id: 1,
        value: 'in-sale',
        label: 'En oferta'
    },
    {
        id: 2,
        value: 'visited',
        label: 'Últimos agregados'
    }

];

const petTypes = [
    {
        id: 1,
        value: 'Dogs',
        label: 'Perro'
    },
    {
        id: 2,
        value: 'Cats',
        label: 'Gato'
    },
    {
        id: 3,
        value: 'Birds',
        label: 'Ave'
    },
    {
        id: 4,
        value: 'Fishes',
        label: 'Pez'
    },
    {
        id: 5,
        value: 'Others',
        label: 'Otros'
    }
];

const controller = {

    index(req, res) {
        const products = getProducts();
        const isLoggedIn = req.isAuthenticated();
        res.render('products/products', { products, isLoggedIn });
    },
    detail(req, res) {
        const products = getProducts();
        const product = products.find(product => product.id == req.params.id);
        const isLoggedIn = req.isAuthenticated();
        res.render('products/productDetail', { product, isLoggedIn });
    }, 
    cart(req,res) {
        const isLoggedIn = req.isAuthenticated();
        const cartProducts = req.session.cart || []; // Obtener productos del carrito desde la sesión
        res.render('products/productCart', { cartProducts, isLoggedIn });    
    },

    addToCart(req, res) {
        const productId = req.body.productId;
        const quantity = req.body.quantity || 1;
    
        // Obtener el producto según el ID
        const product = getProductById(productId);
    
        if (!product) {
            console.error(`Producto no encontrado. ID proporcionado: ${productId}`);
            return res.status(404).json({ error: 'Producto no encontrado' });
        }
    
        // Obtener o inicializar el carrito en la sesión del usuario
        const cart = req.session.cart || [];
    
        // Verificar si el producto ya está en el carrito
        const existingProduct = cart.find(item => item.productId === productId);
    
        if (existingProduct) {
            // Incrementar la cantidad si el producto ya está en el carrito
            existingProduct.quantity += quantity;
        } else {
            // Agregar el producto al carrito
            cart.push({
                productId: productId,
                name: product.name,
                price: product.price,
                quantity: quantity
            });
        }
    
        // Actualizar la sesión con el nuevo carrito
        req.session.cart = cart;
    
        // Verificar si es una solicitud AJAX
        if (req.xhr || req.headers.accept.indexOf('json') > -1) {
            // Si es una solicitud AJAX, responder con un JSON
            return res.json({ success: true, message: 'Producto agregado al carrito' });
        } else {
            // Si no es una solicitud AJAX, redirigir a la página del carrito
            return res.redirect('/cart');
        }
    },

    create(req, res) {
        res.render('products/productCreate', { categories, petTypes });
    },

    store: (req, res) => {

        const products = getProducts();
        const productToCreate = {
            id: products[products.length - 1].id + 1,
            image: 'default-image.png',
            ...req.body
        }
        products.push(productToCreate);
        fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2));
        res.redirect('/');
    },

    edit(req, res) {
        const products = getProducts();
        const product = products.find(product => product.id == req.params.id);
        res.render('products/productEdit', { product, categories, petTypes });
    },

    update: (req, res) => {

        const products = getProducts();
        const indexProduct = products.findIndex(product => product.id == req.params.id);
        products[indexProduct] = {
            ...products[indexProduct],
            ...req.body
        };
        fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2));
        res.redirect('/');
    },

    destroy: (req, res) => {

        const products = getProducts();
        const indexProduct = products.findIndex(product => product.id == req.params.id);

        products.splice(indexProduct, 1);
        fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2));
        res.redirect('/');
    }

};

module.exports = controller;