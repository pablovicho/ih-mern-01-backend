// 1. IMPORTACIONES
const express = require("express")
const router =  express.Router()

const guitarController = require("./../controllers/guitarController")

// 2. ROUTER
router.post("/create", guitarController.create)
//post envía al json
router.get("/readall", guitarController.readAll) //leer guitarras
router.get("/readone/:id", guitarController.readOne)//leer una. el id es vital
//edit
router.put("/edit/:id", guitarController.edit) //como estamos con json, es .put
//delete
router.delete("/delete/:id", guitarController.delete)
// 3. EXPORTACIONES
module.exports = router