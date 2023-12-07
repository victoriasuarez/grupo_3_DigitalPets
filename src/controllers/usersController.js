const bcrypt = require('bcrypt');
const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../data/users.json');

function getUsers() {
    return JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
}

const controller = {
    login(req, res) {
        let isLoggedIn;  // Declara isLoggedIn al principio

        const { email, password, remember } = req.body;
        const users = getUsers();
        const user = users.find((user) => user.email === email);

        if (user && bcrypt.compareSync(password, user.password)) {
            isLoggedIn = true;  // Asigna un valor más adelante si es necesario
            if (remember) {
                res.cookie('rememberUser', user.email, { maxAge: 30 * 24 * 60 * 60 * 1000 });
            }
            return res.render('home', { isLoggedIn, user: req.session.user });
        } else {
            isLoggedIn = false;  // Asigna un valor más adelante si es necesario
            req.flash('error', 'Credenciales incorrectas');
            return res.redirect('/user/login');
        }
    },

    showLoginForm(req, res) {
        let isLoggedIn = req.isAuthenticated();
        const errorMessage = req.flash('error');
        res.render('users/login', { isLoggedIn, errorMessage });
    },
    showRegisterForm(req, res) {
        const errorMessage = req.flash("error");
        res.render("users/register", { isLoggedIn: req.isAuthenticated(), errorMessage });
    },
    register(req, res) {
        console.log('Datos del formulario:', req.body);
        const { firstName, lastName, email, password, confirmPassword, dateOfBirth } = req.body;
    
        if (password !== confirmPassword) {
            req.flash('error', 'Las contraseñas no coinciden');
            return res.redirect('/user/register');
        }
    
        if (!password) {
            req.flash('error', 'La contraseña no puede estar vacía');
            return res.redirect('/user/register');
        }
    
        const jsonData = fs.readFileSync(dataPath, 'utf-8');
        const data = JSON.parse(jsonData);
        const existingUser = data.find(user => user.email === email);
        
        if(existingUser) {
            req.flash('error', 'Usuario ya existente. El email ya se encuentra en nuestros registros');
            return res.redirect('/user/register');
        }
    
        const hashedPassword = bcrypt.hashSync(password, 10);
    
        const imageFileName = req.file ? req.file.filename : "images/users/default-image-users.png"
    
        const newUser = {
            id: data.length + 1,
            firstName,
            lastName,
            email,
            password: hashedPassword,
            dateOfBirth,
            image: imageFileName
        };
    
        data.push(newUser);
    
        fs.writeFileSync(dataPath, JSON.stringify(data, null, 2), 'utf-8');
    
        return res.redirect('/');
    }
};

module.exports = controller;