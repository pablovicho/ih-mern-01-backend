// 1. IMPORTACIONES
const express = require("express")
const router =  express.Router()

const storeController = require("./../controllers/storeController")

// 2. ROUTER
router.post("/create", storeController.create)
//post envía al json
router.get("/readall", storeController.readAll) //leer guitarras
router.get("/readone/:id", storeController.readOne)//leer una. el id es vital

// 3. EXPORTACIONES
module.exports = router