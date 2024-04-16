const express = require('express')
const router = express.Router()

const {
  updateUserHandler,
  showOneUserHandler,
} = require('./handler')
router.get('/show',showOneUserHandler)
router.put('/update',updateUserHandler )


module.exports = router