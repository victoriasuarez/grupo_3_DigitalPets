const fs = require('fs');
const path = require('path');
const db = require('../database/models');
const { validationResult } = require('express-validator');
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

// const petTypes = [
//     {
//         id: 1,
//         value: 'Dogs',
//         label: 'Perro'
//     },
//     {
//         id: 2,
//         value: 'Cats',
//         label: 'Gato'
//     },
//     {
//         id: 3,
//         value: 'Birds',
//         label: 'Ave'
//     },
//     {
//         id: 4,
//         value: 'Fishes',
//         label: 'Pez'
//     },
//     {
//         id: 5,
//         value: 'Others',
//         label: 'Otros'
//     }
// ];

// async function getPetTypes() {
//     const petTypes = await db.PetType.findAll();
//     console.log(petTypes.every(petType => petType instanceof PetType)); // true
//     console.log("All petTypes:", JSON.stringify(petTypes, null, 2));
//     return petTypes;
// }

const controller = {

    index(req, res) {
        const products = getProducts();
        // const isLoggedIn = req.isAuthenticated();
        res.render('products/products', { products });
    },
    detail(req, res) {
        let products = getProducts();
        const product = products.find(product => product.id == req.params.id);
        // const isLoggedIn = req.isAuthenticated();
        products = products.sort(() => 0.5 - Math.random());
        res.render('products/productDetail', { product, products });
    },
    cart(req, res) {
        // const isLoggedIn = req.isAuthenticated();
        const cartProducts = req.session.cart || []; // Obtener productos del carrito desde la sesión
        res.render('products/productCart', { cartProducts });
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

    create: (req, res) => {
        let brandsInDB = db.Brand.findAll();
        let petTypesInDB = db.PetType.findAll();
        let categoriesInDB = db.Category.findAll();
        let petAgesInDB = db.PetAge.findAll();

        Promise
            .all([brandsInDB, petTypesInDB, categoriesInDB, petAgesInDB])
            .then(([brands, petTypes, categories, petAges]) => {
                return res.render('products/productCreate', { brands, petTypes, categories, petAges })
            })
            .catch(error => res.send(error))
    },
    store: (req, res) => {
        db.Product.create({
            name: req.body.name,
            price: req.body.price,
            stock: req.body.stock,
            brands_id: req.body.brand,

            petAges_id: req.body.petAge,
            description: req.body.description,
            discount: req.body.discount,

            image: req.file.filename
            // weight: 
            // color: 
        });
        const categories = req.body.categories;
        const category = db.CategoryProduct;
        category.create

        res.redirect('/');
    },

    edit(req, res) {
        const productInDB = db.Product.findByPk(req.params.id);
        const brandsInDB = db.Brand.findAll();
        const petTypesInDB = db.PetType.findAll();
        const categoriesInDB = db.Category.findAll();
        const petAgesInDB = db.PetAge.findAll();
        Promise
            .all([productInDB, brandsInDB, petTypesInDB, categoriesInDB, petAgesInDB])
            .then(([product, brands, petTypes, categories, petAges]) => {
                return res.render('products/productEdit', { product, brands, petTypes, categories, petAges })
            })
            .catch(error => res.send(error))
        // const products = getProducts();
        // const product = products.find(product => product.id == req.params.id);
        // res.render('products/productEdit', { product, categories, petTypes });
    },

    update: (req, res) => {
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            try {
                db.Product.update({
                    name: req.body.name,
                    price: req.body.price,
                    stock: req.body.stock,
                    brands_id: req.body.brand,
                    petAges_id: req.body.petAge,
                    description: req.body.description,
                    discount: req.body.discount,
                    image: req.file.filename
                }, {
                    where: {
                        id: req.params.id
                    }
                });
                res.redirect('/');
            } catch (error) {
                return res.render('products/productsEdit', {
                    errors: errors.mapped(),
                    oldData: req.body
                })
            }
        } else {
            return res.render('products/productEdit', {
                errors: errors.mapped(),
                oldData: req.body,
            });
        }
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