const express = require('express')
const router = express.Router()
const authenticateToken = require('../../middleware/authenticate')

const {

} = require('./handler')
router.use(authenticateToken)


module.exports = router