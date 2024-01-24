const path = require('path');
const { body } = require('express-validator');

module.exports = [
	body('name').notEmpty().withMessage('Tienes que escribir un nombre para el producto').bail()
		.isLength({ min: 2 }).withMessage('Debe tener al menos 2 caracteres').bail(),

	body('price').notEmpty().withMessage('Tienes que ingresar algún monto').bail()
		.isNumeric().withMessage('El monto debe ser un número entero').bail(),

	body('stock').notEmpty().withMessage('Tienes que escribir un email').bail()
		.isEmail().withMessage('Debes escribir un formato de email válido').bail()
]