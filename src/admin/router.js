const express = require('express')
const router = express.Router()
const authenticateToken = require('../../middleware/authenticate')
const {
    createAdminHandler
  } = require('./handler')
router.use(authenticateToken)

router.post("/add", createAdminHandler);
