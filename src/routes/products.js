const express = require('express');
const productsController = require('../controllers/productsController');
const authMiddleware = require('../middlewares/authMiddleware');
const guestMiddleware = require('../middlewares/guestMiddleware');
const upload = require('../config/multerConfig');

const router = express.Router();

// rutas públicas
router.get('/',productsController.index);
router.get('/:id/detail', productsController.detail);
router.get('/cart', productsController.cart)
router.post('/cart', productsController.addToCart);


// rutas con login
router.get('/create',productsController.create);
router.post('/create', upload.single('producto-img'), productsController.store);
router.get('/:id/edit', productsController.edit);
router.put('/:id/edit', productsController.update);
router.delete('/:id', authMiddleware, productsController.destroy); 


module.exports = router;