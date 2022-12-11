const express = require('express')
const {
    addMessage,
    getMessages
} = require('../controllers/Message.js')
const router = express.Router()
router.use(express.json())


router.post('/', addMessage)
router.get('/', getMessages)

module.exports = router