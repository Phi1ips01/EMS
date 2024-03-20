const express = require('express')
const router = express.Router()
const authenticateToken = require('../../middleware/authenticate')

const {
  updateUserHandler,
  showOneUserHandler,
} = require('./handler')
// router.use(authenticateToken)
router.get('/show',showOneUserHandler)
router.put('/update',updateUserHandler )

module.exports = router