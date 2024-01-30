const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');
const guestMiddleware = require('../middlewares/guestMiddleware');
const upload = require('../config/multerConfig');
const validations = require('../middlewares/validateRegisterMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/register', guestMiddleware, usersController.showRegisterForm);
router.post('/register', upload.single('image') ,validations, usersController.register); 
router.get('/login', guestMiddleware ,usersController.showLoginForm);  
router.post('/login', usersController.login)    

router.get('/profile', authMiddleware, usersController.showProfile);

router.get('/logout',authMiddleware, usersController.logout);


module.exports = router;