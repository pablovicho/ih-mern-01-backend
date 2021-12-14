// IMPORTACIONES
const express =         require("express")
const router =          express.Router()
const userController =  require("./../controllers/userController")
const  authorization =  require("./../middleware/authorization")

// ROUTER
router.post("/create", userController.create)
router.post("/login", userController.login)
router.get("/verifytoken", authorization, userController.verifyToken) //verify es con get

// EXPORTACIÓN
module.exports = router