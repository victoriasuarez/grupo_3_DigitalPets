const db = require('../../database/models');
const { Op } = require("sequelize");
const usersAPIController = {
    list: async (req, res) => {
            await db.User.findAll({
                order:[['firstName','ASC']]
            }).then(users => {
                    let respuesta = {
                        meta: {
                            status: 200,
                            total: users.length,
                            url: 'api/users'
                        },
                        data: users
                    }
                    res.json(respuesta);
                }).catch((err)=> {
                    console.error(err);
                    res.json({ Error: 'Error al intentar acceder a los usuarios.' });
                });
    },

    detail: (req, res) => {
        db.User.findByPk(req.params.id)
            .then(user => {
                let respuesta = {
                    meta: {
                        status: 200,
                        url: '/api/users/:id'
                    },
                    data: user
                }
                res.json(respuesta);
            }).catch((err)=> {
                console.error(err);
                res.json({ Error: 'Error al intentar acceder al usuario' });
            });
    },
    search: async (req, res) => {
        const keyword = req.query.s;
        try {
            const users = await db.User.findAll({
                where: {
                    firstName: {
                        [Op.like]: '%' + keyword + '%'
                    }
                },
                order:[
                    ["firstName","ASC"]
                ]
            });
            res.json({ Search: users });
        } catch (err) {
            console.error(err);
            res.json({ Error: 'Error al buscar usuarios' });
        }
    }
}

module.exports = usersAPIController;