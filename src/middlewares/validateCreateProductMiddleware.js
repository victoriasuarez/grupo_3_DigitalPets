const path = require('path');
const { body, validationResult } = require('express-validator');

module.exports = [
	body('name').notEmpty().withMessage('Tienes que escribir un nombre para el producto').bail()
		.isLength({ min: 2 }).withMessage('Debe tener al menos 2 caracteres').bail(),

	body('description').notEmpty().withMessage('Tienes que escribir un descripcion para el producto'),

	body('petTypes').notEmpty().withMessage('Debes seleccionar al menos una opcion'),

	// body('categories').notEmpty().withMessage('Debes seleccionar al menos una opcion'),

	// body('brand').notEmpty().withMessage('Debes seleccionar una marca'),

	// body('petAge').notEmpty().withMessage('Debes seleccionar una edad'),

	body('price').notEmpty().withMessage('Tienes que ingresar algún monto').bail()
		.isNumeric().withMessage('El monto debe ser un número entero').bail(),

	body('stock').notEmpty().withMessage('Tienes que ingresar un stock').bail()
		.isNumeric().withMessage('El monto debe ser un número entero').bail(),

	body('discount')
		.custom((value) => {
			if (value % 1 !== 0) {
				throw new Error('El monto debe ser un número entero');
			}
			if (value < 0 || value > 100) {
				throw new Error('Tienes que ingresar un valor entre 0 y 100');
			}
			return true;
		}).bail(),

	body('producto-img').custom((value, { req }) => {
		let file = req.file;
		let acceptedExtensions = ['.jpg', '.jpeg', '.png', '.gif'];

		if (file) {
			let fileExtension = path.extname(file.originalname);
			if (!acceptedExtensions.includes(fileExtension)) {
				throw new Error(`Las extensiones de archivo permitidas son ${acceptedExtensions.join(' ')}`);
			}
		}
		return true;
	})
]

const results = (req, res, next) => {
	const result = validationResult(req);
	const hasError = !result.isEmpty()

	if (hasError) {
		console.log("fallo tu validacion")
	}
	next()
}

// module.exports = { productValidation }