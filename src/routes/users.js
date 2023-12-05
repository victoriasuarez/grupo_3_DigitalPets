const express = require('express');
const usersController = require('../controllers/usersController');
const isLoggedMiddleware = require('../middlewares/isLoggedMiddleware');
const upload = require('../config/multerConfig');

const router = express.Router();

router.get('/login', usersController.showLoginForm);
router.get('/register', usersController.showRegisterForm);
router.post('/register', upload.single('image') ,usersController.register);

// Para cuando apliquemos el middleware con su profile en el controller 
// router.get('/profile', isLoggedMiddleware, usersController.showProfile)

router.post('/login', usersController.login)

module.exports = router;