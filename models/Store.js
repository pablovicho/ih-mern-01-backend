// 1. IMPORTACIONES
const mongoose = require("mongoose")
// 2. SCHEMA
const storeSchema = mongoose.Schema({
    nombre: {
        type: String,
        require: true
    },
    domicilio: {
        type: String,
        require:true
    },
    telefono: {
        type:String,
        require:true
    }
})
// 3. MODELOS
const Store = mongoose.model("Store", storeSchema)

// 4. EXPORTACIÓN
module.exports = Store