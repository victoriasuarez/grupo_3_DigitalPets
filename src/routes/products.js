const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController');
const authMiddleware = require('../middlewares/authMiddleware');
const guestMiddleware = require('../middlewares/guestMiddleware');
const upload = require('../config/multerConfig');
const { productValidation, result} = require('../middlewares/validateCreateProductMiddleware');
const checkAdminRole = require('../middlewares/checkAdminRole');


// rutas públicas
router.get('/cart', productsController.cart)
router.get('/:id/detail', productsController.detail);
router.post('/addToCart', productsController.addToCart);
router.get('/', productsController.index);


// rutas con login
router.get('/create',authMiddleware, checkAdminRole,productsController.create);
router.post('/create', upload.single('producto-img'), productValidation, result, productsController.store);
router.get('/:id/edit',authMiddleware, checkAdminRole, productsController.edit);
router.put('/:id', upload.single('producto-img'), productsController.update);
router.delete('/:id', authMiddleware, checkAdminRole, productsController.destroy); 


module.exports = router;