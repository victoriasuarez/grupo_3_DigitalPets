const path = require('path');
const { body } = require('express-validator');

module.exports = [
	body('firstName').notEmpty().withMessage('Tienes que escribir un nombre').bail()
		.isLength({ min: 2 }).withMessage('Debe tener al menos 2 caracteres').bail(),

	body('lastName').notEmpty().withMessage('Tienes que escribir un apellido').bail()
		.isLength({ min: 2 }).withMessage('Debe tener al menos 2 caracteres').bail(),

	body('email').notEmpty().withMessage('Tienes que escribir un email').bail()
		.isEmail().withMessage('Debes escribir un formato de email válido').bail(),

	body('password').notEmpty().withMessage('Tienes que escribir una contraseña').bail()
        .isLength({ min: 8 }).withMessage('Debe tener al menos 8 caracteres'),

	body('confirmPassword').notEmpty().withMessage('Tienes que repetir la contraseña'),
	body('confirmPassword').custom((value, { req }) => {
		if (value !== req.body.password) {
			throw new Error('Las contraseñas deben ser iguales');
		}
		return true;
	}),

	body('birthDate').notEmpty().withMessage('Debe tener la fecha de nacimiento'),

	body('image').custom((value, { req }) => {
		let file = req.file;
		let acceptedExtensions = ['.jpg','.jpeg', '.png', '.gif'];

		if (file) {
			let fileExtension = path.extname(file.originalname);
			if (!acceptedExtensions.includes(fileExtension)) {
				throw new Error(`Las extensiones de archivo permitidas son ${acceptedExtensions.join(' ')}`);
			}
		}

		return true;
	})
]