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
		const isLoggedIn = req.user ? true : false;
		const products = getProducts();
		const visited = products.filter(product => product.category.find((category) => category === 'visited') != undefined);
		const inSale = products.filter(product => product.category.find((category) => category === 'in-sale') != undefined);
		const food = products.filter(product => product.category.find((category) => category === 'food') != undefined);
		res.render('home', { isLoggedIn, visited, inSale,food });
	},
	search: (req, res) => {
		// Do the magic
	},
};

module.exports = controller;
