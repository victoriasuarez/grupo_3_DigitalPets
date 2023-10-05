const express = require('express');

const productsController = require('../controllers/productsController');

const router = express.Router();

router.get('/cart', productsController.cart);
router.get('/detail', productsController.detail);
router.get('/create', productsController.create);
router.get('/edit', productsController.edit);

module.exports = router;