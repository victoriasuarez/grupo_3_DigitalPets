const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/products.json');

function getProducts() {
	const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
	return products;
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
        label: 'Perros'
    },
    {
        id: 2,
        value: 'Cats',
        label: 'Gatos'
    },
    {
        id: 3,
        value: 'Birds',
        label: 'Aves'
    },
    {
        id: 4,
        value: 'Fishes',
        label: 'Peces'
    },
    {
        id: 5,
        value: 'Others',
        label: 'Otros'
    }
];

const controller = {


    detail(req, res) {
        const products = getProducts();
		const product = products.find(product => product.id == req.params.id);
		if (!product) {
			return res.render('error', {
				message: 'El producto no existe',
				error: {
					status: 404
				},
				path: req.url
			});
		}
        res.render('products/productDetail', {product});
    },

    cart(req, res) {
        res.render('products/productCart');
    },

    create(req, res) {
        res.render('products/productCreate', {categories, petTypes});
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
        res.render('products/productEdit', {product, categories, petTypes});
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