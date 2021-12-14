const jwt = require("jsonwebtoken")
const decrypt = async (req,res,next) => {
//capturar el token y guardarlo en una variable
    const token = req.header("x-auth-token")
if(!token){ //si no hay token, error
    res.status(401).json({
        msg:"No hay token, permiso no válido"
    })
}
//si sí hay token, entonces trae el token
try {
    const openToken = await  jwt.verify(token, process.env.SECRET)
    req.user = openToken.user
    console.log("openToken", openToken)
    next()
} catch (error) {
    res.json({
        msg:"Hubo un  error con el token"
    })
}
}


module.exports = decrypt