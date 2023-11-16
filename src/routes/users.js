const express = require('express');

const usersController = require('../controllers/usersController');
const upload = require('../config/multerConfig');

const router = express.Router();

router.get('/login', usersController.login);
router.get('/register', usersController.showRegisterForm);
router.post('/register', upload.single('image') ,usersController.register);



module.exports = router;