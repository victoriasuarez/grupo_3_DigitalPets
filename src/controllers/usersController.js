const path = require('path');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');

const db = require('../database/models');
const { Console } = require('console');

const controller = {
    showRegisterForm(req, res) {
        res.render("users/register");
    },

    register: async (req, res) => {
        const errors = validationResult(req);
		if (errors.isEmpty()) {
			try {
				const userInDB = await db.User.findOne({
					where: {
						email: req.body.email
					}
				});
				if (userInDB) {
					return res.render('users/register', {
						errors: {
							email: {
								msg: "El email ya se encuentra registrado"
							}
						}, oldData: req.body
					});
				} else {
                    const role = await db.Role.findOne({ where: { name: 'Usuario' } });
                    db.User.create({
                        firstName: req.body.firstName,
                        lastName: req.body.lastName,
                        email: req.body.email,
                        password: req.body.password,
                        birthDate: req.body.birthDate,
                        roles_id: role.id
					});
					res.redirect('/users/login');
				}
			} catch (error) {		
                return res.render('users/register', { 
                    errors: errors.mapped(),
                    oldData: req.body
                });
			}
		} else {
			return res.render('users/register', {
				errors: errors.mapped(),
				oldData: req.body,
			});
		}

	}, 

    showLoginForm(req, res) {
        res.render('users/login');
    },

    login: async (req, res) => {
        
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
                        msg: 'Credenciales inválidas'
                    }
                }    
            });
        }   
        return res.render('users/login', {
			errors: {
				email: {
					msg: 'No se encuentra este email en nuestra base de datos'
				}
			}
		}); 
           
    },

    showProfile(req, res) {
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