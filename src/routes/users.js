const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');
// const isLoggedMiddleware = require('../middlewares/isLoggedMiddleware');
const guestMiddleware = require('../middlewares/guestMiddleware');
const upload = require('../config/multerConfig');
const validations = require('../middlewares/validateRegisterMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');

// rutas públicas
router.get('/register', guestMiddleware, usersController.showRegisterForm);
router.post('/register', upload.single('image') ,validations,usersController.register); 
router.get('/login', guestMiddleware ,usersController.showLoginForm);  
router.post('/login', usersController.login)    

// rutas con login
// router.get('/private', isLoggedMiddleware, (req, res) => {
//     res.send('Página privada accesible solo con iniciar sesión');
// });

// Para cuando apliquemos el middleware con su profile en el controller 
router.get('/profile', authMiddleware, usersController.showProfile);

router.get('/logout', usersController.logout);


module.exports = router;