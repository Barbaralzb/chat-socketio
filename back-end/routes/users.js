const express = require('express')
const {
    addUser, getUser,
} = require('../controllers/User.js')

const router = express.Router()
router.use(express.json())

router.get('/:id', getUser)
router.post('/', addUser)

module.exports = router