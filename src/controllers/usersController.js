const bcrypt = require('bcrypt');
const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../data/users.json');

function getUsers() {
    return JSON.parse(fs.readFileSync(usersDataFilePath, 'utf-8'));
}

const controller = {
    login(req, res) {
        const users= getUsers();
        const user = users.find((user) => user.email ===req.body.email);
        if(!user) {
            return res.render('login')
        } /// **
        
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