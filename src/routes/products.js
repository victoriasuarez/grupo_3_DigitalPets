const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController');
const authMiddleware = require('../middlewares/authMiddleware');
const guestMiddleware = require('../middlewares/guestMiddleware');
const upload = require('../config/multerConfig');
const productValidation = require('../middlewares/validateCreateProductMiddleware');
const checkAdminRole = require('../middlewares/checkAdminRole');


// rutas públicas
router.get('/', productsController.index);
router.get('/:id/detail', productsController.detail);
router.get('/cart', productsController.cart)
router.post('/cart', productsController.addToCart);


// rutas con login
router.get('/create',authMiddleware, checkAdminRole,productsController.create);
router.post('/create', upload.single('producto-img'), productValidation, productsController.store);
router.get('/:id/edit',authMiddleware, checkAdminRole, productsController.edit);
router.put('/:id', upload.single('producto-img'), productsController.update);
router.delete('/:id', authMiddleware, checkAdminRole, productsController.destroy); 


module.exports = router;