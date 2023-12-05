const bcrypt = require('bcrypt');
const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../data/users.json');

function getUsers() {
    return JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
}

const controller = {
    login(req, res) {
        console.log('Entró en la función login');  
        const { email, password } = req.body;
        console.log('Email y Password:', email, password);  

        const users = getUsers();
        const user = users.find((user) => user.email === email);

        console.log('Usuario encontrado:', user); 

        if (!user || !bcrypt.compareSync(password, user.password)) {
            return res.redirect('/user/login'); 
        }

        req.session.user = {
            id: user.id,
            email: user.email,
        };

        res.redirect('/');
    },
    showLoginForm(req, res) {
        res.render('users/login');
    },
    showRegisterForm(req,res) {
        res.render("users/register")
    },
    register(req, res) {
        console.log('Datos del formulario:', req.body);
        const { firstName, lastName, email, password, confirPassword, dateOfBirth} = req.body;
        
        if (password !== confirPassword) {
            throw new Error('Las contraseñas no coinciden');
        }

        if (!password) {
            throw new Error('La contraseña no puede estar vacía');
        }

        const jsonData = fs.readFileSync(dataPath, 'utf-8');
        const data = JSON.parse(jsonData);
        const existingUser = data.find(user => user.email === email);
        if(existingUser) {
            throw new Error('Usuario ya existente. El email ya se encuentra en nuestros registros');
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

        res.redirect('/user/login');
    }
};

module.exports = controller;