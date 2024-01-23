const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const path = require('path');
const fs = require('fs');

const db = require('../database/models');

// const dataPath = path.join(__dirname, '../data/users.json');

// function getUsers() {
//     return JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
// }

//Esta variable representa el modelo User de la base de datos (se eliminará cuando hayamos configurado la BD)
// const User = {
//     fileName: path.join(__dirname, '../data/users.json'),

//     getUsers: function () {
//         return JSON.parse(fs.readFileSync(this.fileName, 'utf-8'));
//     },

//     generateId: function () {
//         let allUsers = this.findAll();
//         let lastUser = allUsers.pop();
//         if (lastUser) {
//             return lastUser.id + 1;
//         }
//         return 1;
//     },

//     findAll: function () {
//         return this.getUsers();
//     },

//     findByPk: function (id) {
//         let allUsers = this.findAll();
//         let userFound = allUsers.find(oneUser => oneUser.id === id);
//         return userFound;
//     },

//     findByField: function (field, text) {
//         let allUsers = this.findAll();
//         let userFound = allUsers.find(oneUser => oneUser[field] === text);
//         return userFound;
//     },

//     create: function (userData) {
//         let allUsers = this.findAll();
//         let newUser = {
//             id: this.generateId(),
//             ...userData
//         }
//         allUsers.push(newUser);
//         fs.writeFileSync(this.fileName, JSON.stringify(allUsers, null, ' '));
//         return newUser;
//     },

//     delete: function (id) {
//         let allUsers = this.findAll();
//         let finalUsers = allUsers.filter(oneUser => oneUser.id !== id);
//         fs.writeFileSync(this.fileName, JSON.stringify(finalUsers, null, ' '));
//         return true;
//     }
// }
const controller = {
    showRegisterForm(req, res) {
        const errorMessage = req.flash("error");
        res.render("users/register", { errorMessage });
        // res.render("users/register");
    },
    async register(req, res) {
        try {
            const resultValidation = validationResult(req);
            if (resultValidation.errors.length > 0) {
                return res.render('users/register', {
                    errors: resultValidation.mapped(),
                    oldData: req.body
                });
            }
            let userInDB = await db.User.findOne({ where: { email: req.body.email }});
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
            const role = await db.Role.findOne({ where: { name: 'Usuario' } });
            let userToCreate = {
                // ...req.body,
              
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                password: req.body.password,
                birthDate: req.body.birthDate,
                roles_id: role.id,
                image : req.file ? req.file.filename : "default-image-users.png"
            };
            console.log(userToCreate);

            await db.User.create(userToCreate);

            return res.redirect('/users/login');
        } catch (error) {
            return res.status(500).send(error);
        }
    },
    showLoginForm(req, res) {

        const errorMessage = req.flash('error');
        res.render('users/login', { errorMessage });
    },
    async login(req, res) {
        // const userToLogin = await db.User.findByField('email',req.body.email);
        const userToLogin = await db.User.findOne({ where: { email: req.body.email }});
        if (userToLogin) {
            const checkPassword = bcrypt.compareSync(req.body.password, userToLogin.password);
            if (checkPassword) {
                delete userToLogin.password; //eliminamos la password para que no se guarde en la session
                req.session.userLogged = userToLogin; //guardo el usuario en session
                if (req.body.remember) {
                    res.cookie('userEmail', req.body.email, { maxAge: 1000 * 60 * 5 });
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
    showProfile(req, res) {
        console.log(req.cookies.userEmail);
        return res.render('users/profile', {
            user: req.session.userLogged
        });
    },

    logout(req, res) {
        res.clearCookie('userEmail');
        req.session.destroy();
        return res.redirect('/');
    }
};

module.exports = controller;