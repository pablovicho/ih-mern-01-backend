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


// iniciar sesión, autenticar por email y contraseña, se le envía un token
exports.login= async(req,res) => {
    //obtener email y password del json
    const {email,password} = req.body
    try {
        //verificar que esté en base de datos)
        const foundUser = await User.findOne({email}) //encuentra un usuario por email

        if(!foundUser) {
            return res.status(400).json({
                msg: "El usuario o la contraseña son incorrectos"
            })
        }
        //evaluar la contraseña
        const verifiedPass = await bcryptjs.compare(password, foundUser.password) //comparación del pw

        if(!verifiedPass) {
            return res.status(400).json({
                msg: "El usuario o la contraseña son incorrectos"
            })
        }
console.log("foundUser:", foundUser) //¿qué son los dos puntos?
        // si todo es correcto, generamos un json web token:
        // a.  establecer un payload, datos del usuario
        const payload = {
            user: {
                id: foundUser.id
            }
        }

        //6B. FIRMA DEL JWT
        jwt.sign(
            payload,
            process.env.SECRET,
            {
                expiresIn: 360000
            },
            (error, token) => {
                if(error) throw error //la documentación pide que el error se marque de esta forma
                res.json({
                    msg: "Inicio de sesión exitoso",
                    data: token
                })
            }
        )



    } catch (error) {
        console.log(err)
        res.status(500).json({
            msg:"Hubo un problema de autenticación",
            data:error
        })
    }
}

// verificar usuario: si el usuario tiene permisos o no
exports.verifyToken = async(req,res) => {
    try {
//buscar el id del usuario (del token abierto) en db
const foundUser = await User.findById(req.user.id).select("-password") //esto quita el password del envío de datos, por seguridad
res.json({
    msg: "Datos de usuario encontrados",
    data: foundUser
})    

} catch (error) {
console.log(error)
res.status(500).json({
    msg: "Hubo un error con el usuario"
})
}

}
