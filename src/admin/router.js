const express = require('express')
const router = express.Router()
const {
    createAdminHandler,
    showAllAdminHandler,
    updateAdminHandler,
    deleteOneAdminHandler,
    showOneAdminHandler,
  } = require('./handler')
router.get('/showOne',showOneAdminHandler)
router.post("/add", createAdminHandler);
router.get("/showall",showAllAdminHandler)
router.put("/update",updateAdminHandler)
router.delete("/delete",deleteOneAdminHandler)

module.exports = router