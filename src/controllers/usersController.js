const bcrypt = require('bcryptjs');
const {	validationResult } = require('express-validator');
const path = require('path');
const fs = require('fs');

// const dataPath = path.join(__dirname, '../data/users.json');

// function getUsers() {
//     return JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
// }

//Esta variable representa el modelo User de la base de datos (se eliminará cuando hayamos configurado la BD)
const User = {
	fileName: path.join(__dirname,'../data/users.json'),

	getUsers: function () {
		return JSON.parse(fs.readFileSync(this.fileName, 'utf-8'));
	},

	generateId: function () {
		let allUsers = this.findAll();
		let lastUser = allUsers.pop();
		if (lastUser) {
			return lastUser.id + 1;
		}
		return 1;
	},

	findAll: function () {
		return this.getUsers();
	},

	findByPk: function (id) {
		let allUsers = this.findAll();
		let userFound = allUsers.find(oneUser => oneUser.id === id);
		return userFound;
	},

	findByField: function (field, text) {
		let allUsers = this.findAll();
		let userFound = allUsers.find(oneUser => oneUser[field] === text);
		return userFound;
	},

	create: function (userData) {
		let allUsers = this.findAll();
		let newUser = {
			id: this.generateId(),
			...userData
		}
		allUsers.push(newUser);
		fs.writeFileSync(this.fileName, JSON.stringify(allUsers, null,  ' '));
		return newUser;
	},

	delete: function (id) {
		let allUsers = this.findAll();
		let finalUsers = allUsers.filter(oneUser => oneUser.id !== id);
		fs.writeFileSync(this.fileName, JSON.stringify(finalUsers, null, ' '));
		return true;
	}
}
const controller = {
    // login(req, res) {
    //     let isLoggedIn;

    //     const { email, password, remember } = req.body;
    //     const users = getUsers();
    //     const user = users.find((user) => user.email === email);

    //     if (user && bcrypt.compareSync(password, user.password)) {
    //         isLoggedIn = true;
    //         if (remember) {
    //             res.cookie('rememberUser', user.email, { maxAge: 30 * 24 * 60 * 60 * 1000 });
    //         }
    //         return res.render('home', { isLoggedIn, user: req.session.user });
    //     } else {
        //         isLoggedIn = false; 
        //         req.flash('error', 'Credenciales incorrectas');
        //         return res.redirect('/user/login');
        //     }
    // },
    showRegisterForm(req, res) {
        const errorMessage = req.flash("error");
        res.render("users/register", { errorMessage });
    },
    login(req,res){
        const userToLogin = User.findByField('email',req.body.email);

        if(userToLogin){
            const checkPassword = bcrypt.compareSync(req.body.password, userToLogin.password);
            if(checkPassword){
                delete userToLogin.password; //eliminamos la password para que no se guarde en la session
                req.session.userLogged = userToLogin; //guardo el usuario en session
                if(req.body.remember){
                    res.cookie('userEmail', req.body.email, { maxAge : 1000 * 60 * 5 });
                }
                return res.redirect('profile');         
            }
            return res.render('users/login', {
                errors: {
                    email: {
                        msg: 'Las credenciales son inválidas'
                    }
                }
            });
        }
    },
    showProfile(req,res){
        console.log(req.cookies.userEmail);
        return res.render('users/profile',{
            user: req.session.userLogged
        });
    },

    showLoginForm(req, res) {
         
        const errorMessage = req.flash('error');
        res.render('users/login', {  errorMessage });
    },
    register(req, res) {
        const resultValidation = validationResult(req);

		if (resultValidation.errors.length > 0) {
			return res.render('users/register', {
				errorMessage: resultValidation.mapped(),
				oldData: req.body
			});
		}

		let userInDB = User.findByField('email', req.body.email);

		if (userInDB) {
			return res.render('users/register', {
				errors: {
					email: {
						msg: 'Este email ya está registrado'
					}
				},
				oldData: req.body
			});
		}

		let userToCreate = {
			...req.body,
			password: bcryptjs.hashSync(req.body.password, 10),
			imagen: req.file.filename
		}

		let userCreated = User.create(userToCreate);

		return res.redirect('/users/login');
    },
    // register(req, res) {
    //     console.log('Datos del formulario:', req.body);
    //     const { firstName, lastName, email, password, confirmPassword, dateOfBirth } = req.body;
    
    //     if (password !== confirmPassword) {
    //         req.flash('error', 'Las contraseñas no coinciden');
    //         return res.redirect('/user/register');
    //     }
    
    //     if (!password) {
    //         req.flash('error', 'La contraseña no puede estar vacía');
    //         return res.redirect('/user/register');
    //     }
    
    //     const jsonData = fs.readFileSync(dataPath, 'utf-8');
    //     const data = JSON.parse(jsonData);
    //     const existingUser = data.find(user => user.email === email);
        
    //     if(existingUser) {
    //         req.flash('error', 'Usuario ya existente. El email ya se encuentra en nuestros registros');
    //         return res.redirect('/user/register');
    //     }
    
    //     const hashedPassword = bcrypt.hashSync(password, 10);
    
    //     const imageFileName = req.file ? req.file.filename : "images/users/default-image-users.png"
    
    //     const newUser = {
    //         id: data.length + 1,
    //         firstName,
    //         lastName,
    //         email,
    //         password: hashedPassword,
    //         dateOfBirth,
    //         image: imageFileName
    //     };
    
    //     data.push(newUser);
    
    //     fs.writeFileSync(dataPath, JSON.stringify(data, null, 2), 'utf-8');
    
    //     return res.redirect('/');
    // },
    
    logout(req,res){
        res.clearCookie('userEmail');
        req.session.destroy();
        return res.redirect('/');
    }
};

module.exports = controller;