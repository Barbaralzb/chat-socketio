const User = require('../models/user')

function getUser (req, res) {
    User.findById(req.params.id, function (err, userinfo) {
        if (err) res.status(500).send(err)
        else res.status(200).json(userinfo)
    })
};

function addUser (req, res) {
    User.create(req.body, function (err, userinfo) {
        if (err) {
            res.status(500).send(err)
            console.log('hubo un error al crear new user', err)
        } else {
            res
            .status(200)
            .send({
                success: true,
                idUser: userinfo.id
            })
        }
    })
};

module.exports = {
    addUser,
    getUser
}