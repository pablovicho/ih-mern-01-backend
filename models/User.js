// 1. IMPORTACIONES
const mongoose = require("mongoose")

// SCHEMA
const UserSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    apellido: {
        type: String,
        default: ""
    },
    pais: {
        type: String,
        default: ""
    },
    direccion: {
        type: String,
        default: ""
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

// MODELO
const User = mongoose.model("User", UserSchema)
// EXPORTACIÓN
module.exports = User