require('dotenv').config();
const express = require('express')
const mongoose = require('mongoose')


// export one function that gets called once as the server is being initialized
module.exports = function (app, server) {

    // Me conecto con mi  base de 
    mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_URL}/${process.env.DB_NAME}?retryWrites=true&w=majority`,
    { useNewUrlParser: true,
    useUnifiedTopology: true })
    .then(() => console.log('✅ Estoy conectada con la DB'))
    .catch(() => console.log('DB failed'));

    app.use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
        res.setHeader('Access-Control-Allow-Methods', '*');
        next();
    });

    app.use(express.json());

    // Aqui es donde agregue las rutas de mis apis
    const messagesRouter = require('./routes/messages');
    const usersRouter = require('./routes/users');

    // Aqui le digo a mi app donde tiene que ir segun la URI
    app.use('/messages', messagesRouter)
    app.use('/', usersRouter)

    const io = require('socket.io')(server, {
        cors: {
            origin: "http://127.0.0.1:5500",
            methods: ["GET", "POST"]
        }
    })

    require('./socket/chat')(io);

    app.use(function (req, res, next) { req.io = io; next(); });

    app.get('/test', (req, res, next) => {
        res.status(200).json({ hello: 'world' })
    })
}