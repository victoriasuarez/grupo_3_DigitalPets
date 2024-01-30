const fs = require('fs');
const path = require('path');
const db = require('../database/models');
const productsFilePath = path.join(__dirname, '../data/products.json');

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	index: async (req, res) => {
		try {
			const petTypes = await db.PetType.findAll();
			const brands = await db.Brand.findAll();
            const products = await db.Product.findAll({ include: ['categories', 'petTypes'] });
			res.render('home', {  petTypes, brands, products });
        } catch (error) {
            res.status(500).send(error);
        }
	},
	search: (req, res) => {
		// Do the magic
	},
};

module.exports = controller;
