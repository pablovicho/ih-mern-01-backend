const bcryptjs = require("bcryptjs")
const User = require("./../models/User")
const jwt = require("jsonwebtoken")

exports.create = async(req,res) => {

        const {
            nombre,
            apellido,
            pais,
            direccion,
            email,
            password
        } = req.body

    
    

// generar password para db
try {
const salt = await bcryptjs.genSalt(10)
const hashedPassword = await bcryptjs.hash(password, salt)
//esto me genera un pasword hasheado(o encriptado)
console.log(hashedPassword)

// crear el usuario en db
const newUser = await User.create({
    nombre,
    apellido,
    pais,
    direccion,
    email,
    password:hashedPassword, 
})
//password sigue el modelo, pero le damos el valor de hashedPassword


// tokens: información del usuario de forma cifrada
// a. crear un payload(información del usuario)
const payload = {
    user: {
        id: newUser._id
    }
}

// b. autenticación: firmar el token
jwt.sign(
    payload, //datos que acompañan al token
process.env.SECRET, //palabra secreta
{
    expiresIn:360000 //expiración en milisegundos
},
(error, token) => {
    if(error) throw error
    res.json({
        msg:"Token correctamente generado",
        data:token
    })
}
    )


} catch (error) {
res.status(500).json({
    msg:"Hubo un error con la creación de usuario",
    error:error
})
}
}