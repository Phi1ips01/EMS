const express = require('express')
const router = express.Router()
const {
    loginUserHandler
  } = require('./handler')

router.post("/",loginUserHandler)

module.exports = router