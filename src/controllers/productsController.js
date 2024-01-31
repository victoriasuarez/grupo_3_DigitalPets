const fs = require('fs');
const path = require('path');
const db = require('../database/models');
const { validationResult } = require('express-validator');

const controller = {

    index: async (req, res) => {
        let products = await db.Product.findAll({ include: ['brand', 'petAge'] });
        res.render('products/products', { products, user: req.session.userLogged });
    },

    detail: async (req, res) => {
        let product = await db.Product.findByPk(req.params.id);
        let products = await db.Product.findAll({ include: ['petTypes'] });
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

    store: async (req, res) => {
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            try {
                const result = await db.sequelize.transaction(async (t) => {
                    const product = await db.Product.create({
                        name: req.body.name,
                        price: req.body.price,
                        stock: req.body.stock,
                        brands_id: req.body.brand? req.body.brand : null,
                        petAges_id: req.body.petAge? req.body.petAge : null,
                        description: req.body.description,
                        discount: req.body.discount? req.body.discount : null,
                        image: req.file?.filename
                        //weight: 
                        //color: 
                    }, { transaction: t });

                    let categoriesBody = Array.isArray(req.body.categories) ? req.body.categories : [req.body.categories];;
                    let categoriesProducts = categoriesBody.map((category) => {
                        return {
                            categoryId: category,
                            productId: product.id
                        }
                    });
                    const createdCategories = await db.CategoryProduct.bulkCreate(categoriesProducts, { transaction: t });
                    // Si alguna de las relaciones de categoría de producto no se creó correctamente, lanzamos un error
                    if (createdCategories.some(categoryProduct => !categoryProduct)) {
                        throw new Error('Error al crear CategoryProduct');
                    }

                    let petTypesBody = Array.isArray(req.body.petTypes) ? req.body.petTypes : [req.body.petTypes];
                    let petTypesProducts = petTypesBody.map((petType) => {
                        return {
                            petTypeId: petType,
                            productId: product.id
                        }
                    });
                    const createdPetTypes = await db.PetTypeProduct.bulkCreate(petTypesProducts, { transaction: t });
                    // Si alguna de las relaciones de Tipo de mascota no se creó correctamente, lanzamos un error
                    if (createdPetTypes.some(petTypeProduct => !petTypeProduct)) {
                        throw new Error('Error al crear PetTypeProduct');
                    }
                    return product;
                });

                res.redirect('/products/');
            } catch (error) {
                console.log(`Este fue el error: ${error}`);
                res.status(500).send(error);
            }
        } else {
            let brandsInDB = db.Brand.findAll();
            let petTypesInDB = db.PetType.findAll();
            let categoriesInDB = db.Category.findAll();
            let petAgesInDB = db.PetAge.findAll();

            Promise
                .all([brandsInDB, petTypesInDB, categoriesInDB, petAgesInDB])
                .then(([brands, petTypes, categories, petAges]) => {
                    return res.render('products/productCreate', { 
                        brands, 
                        petTypes,
                        categories, 
                        petAges, 
                        errors: errors.mapped(),
                        oldData: req.body, })
                })
                .catch(error => res.send(error));
        }
    },



    edit(req, res) {
        const productInDB = db.Product.findByPk(req.params.id);
        const brandsInDB = db.Brand.findAll();
        const petTypesInDB = db.PetType.findAll();
        const categoriesInDB = db.Category.findAll();
        const petAgesInDB = db.PetAge.findAll();
        let categoriesProductsInDB = db.CategoryProduct.findAll({
            where: {
                productId: req.params.id
            }
        });
        let petTypesProductsInDB = db.PetTypeProduct.findAll({
            where: {
                productId: req.params.id
            }
        });
        Promise
            .all([productInDB, brandsInDB, petTypesInDB, categoriesInDB, petAgesInDB, categoriesProductsInDB, petTypesProductsInDB])
            .then(([product, brands, petTypes, categories, petAges, categoriesProducts, petTypesProducts]) => {
                return res.render('products/productEdit', { product, brands, petTypes, categories, petAges, categoriesProducts, petTypesProducts })
            })
            .catch(error => res.send(error))
    },

    update: async (req, res) => {
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            try {
                const product = await db.Product.update({
                    name: req.body.name,
                    price: req.body.price,
                    stock: req.body.stock,
                    brands_id: req.body.brand ? req.body.brand : null,
                    petAges_id: req.body.petAge ? req.body.petAge : null,
                    description: req.body.description,
                    discount: req.body.discount,
                    image: req.file?.filename
                    //weight: 
                    //color: 
                }, {
                    where: { id: req.params.id }
                });
                return res.redirect('/products');

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

    destroy: async (req, res) => {
        try {
            await db.Product.destroy({ where: { id: req.params.id } })
            await db.CategoryProduct.destroy({ where: { productId: req.params.id } })
            await db.PetTypeProduct.destroy({ where: { productId: req.params.id } })
            return res.redirect('/products');
        } catch (error) {
            return res.status(500).send(error);
        }
    }

};

module.exports = controller;