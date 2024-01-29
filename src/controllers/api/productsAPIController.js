const db = require('../../database/models');
const { Op } = require("sequelize");
const productsAPIController = {
    list: async (req, res) => {
        await db.Product.findAll({
            order: [['name', 'ASC']]
        }).then(products => {
            let respuesta = {
                meta: {
                    status: 200,
                    total: products.length,
                    url: 'api/products'
                },
                data: products
            }
            res.json(respuesta);
        }).catch((err) => {
            console.error(err);
            res.json({ Error: 'Error al intentar acceder a los productos.' });
        });
    },

    detail: (req, res) => {
        db.Product.findByPk(req.params.id)
            .then(product => {
                let respuesta = {
                    meta: {
                        status: 200,
                        url: '/api/products/:id'
                    },
                    data: product
                }
                res.json(respuesta);
            }).catch((err) => {
                console.error(err);
                res.json({ Error: 'Error al intentar acceder al producto' });
            });
    },
    search: async (req, res) => {
        const keyword = req.query.s;
        try {
            const products = await db.Product.findAll({
                where: {
                    name: {
                        [Op.like]: '%' + keyword + '%'
                    }
                },
                order: [
                    ["name", "ASC"]
                ]
            });
            res.json({ Search: products });
        } catch (err) {
            console.error(err);
            res.json({ Error: 'Error al buscar productos' });
        }
    },
    lastProduct: async (req, res) => {
        try {
            const product = await db.Product.findOne({
                order: [
                    ['createdAt', 'DESC']
                ]
            });
            let respuesta = {
                meta: {
                    status: 200,
                    url: '/api/products/:id'
                },
                data: product
            }
            res.json(respuesta);
        } catch (err) {
            console.error(err);
            res.json({ Error: 'Error al buscar el último producto' });
        }
    }
}

module.exports = productsAPIController;