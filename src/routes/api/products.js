const express = require('express');
const router = express.Router();
const productsAPIController = require('../../controllers/api/productsAPIController');

router.get('/', productsAPIController.list);
router.get('/search', productsAPIController.search);
router.get('/last-product', productsAPIController.lastProduct);
router.get('/:id', productsAPIController.detail);

module.exports = router;