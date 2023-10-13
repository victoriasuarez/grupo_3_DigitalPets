const express = require('express');

const productsController = require('../controllers/productsController');

const router = express.Router();

router.get('/cart', productsController.cart);

router.get('/detail', productsController.detail);

router.get('/create', productsController.create);
router.post('/', productsController.store);

router.get('/:id/edit', productsController.edit);
router.put('/:id', productsController.update);

router.delete('/:id', productsController.destroy); 


module.exports = router;