const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/products.json');

function getProducts() {
	const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
	return products;
}

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	index: (req, res) => {
		// Do the magic
		const products = getProducts();
		const visited = products.filter(product => product.category === 'visited');
		const inSale = products.filter(product => product.category === 'in-sale');
		res.render('home', { visited, inSale });
	},
	search: (req, res) => {
		// Do the magic
	},
};

module.exports = controller;
