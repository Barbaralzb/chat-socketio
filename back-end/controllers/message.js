const Message = require('../models/Message')
const User = require('../models/user')

function addMessage (req, res, next) {
    const { userid, text } = req.body
    try {
        User.findById(userid, function (err, userinfo) {
            if (err) res.status(500).res('hubo un error antes de la instancia, id no existe en la db' + 500)
            else {
                const messageInstance = new Message({
                    user : userid,
                    pseudo : userinfo.pseudo,
                    text
                })
                userinfo.messages.push(messageInstance)
                userinfo.save(function (err) {
                    if (err) res.status(500).send('hubo un error guardar el post' + err)
                    else {
                        messageInstance.save(function (err) {
                            if (err) {
                            res.status(500).send({
                                success: false,
                                err
                            })
                            } else {
                            res
                                .status(200)
                                .send({
                                success: true
                                })
                            }
                        })
                    }
                })
            }
        })
    } catch (error) {
    console.log('no pudo entrar en el try para crear el message', error)
    return res.status(404).send(error.message)   
    } 
} 

function getMessages (req, res) {
    Message.find().populate('user').exec(function (err, messages) {
        if (err) res.status(500).send(err)
        else res.status(200).json(messages)
    })
};

module.exports = {
    addMessage,
    getMessages
}