const express = require('express')
const router = express.Router()
const authenticateToken = require('../../middleware/authenticate')
const {
    createAdminHandler,
    showAllAdminHandler,
    updateAdminHandler,
    deleteOneAdminHandler,

  } = require('./handler')
// router.use(authenticateToken)

router.post("/add", createAdminHandler);
router.get("/showall",showAllAdminHandler)
router.put("/update",updateAdminHandler)
router.delete("/delete",deleteOneAdminHandler)

module.exports = router