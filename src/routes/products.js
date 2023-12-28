const express = require('express');
const productsController = require('../controllers/productsController');
const isLoggedMiddleware = require('../middlewares/isLoggedMiddleware');

const router = express.Router();

// rutas públicas
router.get('/', productsController.index);
router.get('/:id/detail', productsController.detail);
router.get('/cart', productsController.cart)
router.post('/cart', productsController.addToCart);


// rutas con login
router.get('/create', isLoggedMiddleware, productsController.create);
router.post('/', isLoggedMiddleware, productsController.store);
router.get('/:id/edit', isLoggedMiddleware, productsController.edit);
router.put('/:id', isLoggedMiddleware, productsController.update);
router.delete('/:id', isLoggedMiddleware, productsController.destroy); 


module.exports = router;