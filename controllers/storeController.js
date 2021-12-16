const Store = require("./../models/Store")
exports.create = async(req,res) => {
    //del formulario, creamos variables y asignamos valores
    const {
        nombre,
        domicilio,
        telefono
    } = req.body

//try-catch es en un proceso asíncrono, si existe algún problema
    try{
const newStore = await Store.create({
    nombre,
    domicilio,
    telefono
})

//devolver una respuesta en formato json
res.json({
    msg: "Tienda creada con éxito",
    data: newStore

})

    } catch(error) {
res.status(500).json({
    msg: "Hubo un error creando la tienda",
    error //o error:error, cuando el valor es el mismo que la referencia se puede quitar
})
//el 500 es el que muestra el error
    }
}

exports.readAll =async(req,res) => {
try{
    const stores = await Store.find({})
    res.json({
        msg:"Tiendas obtenidas",
        data:stores
    })
}catch(error){
    res.status(500).json({
        msg:"hubo un error obteniendo los datos",
        error:error
    })
}
}

exports.readOne = async(req,res) => {
    const {id} = req.params
    try {
        const store = await Store.findById(id)
        res.json({
            msg:"Tienda obtenida con éxito",
            data:store
        })
    } catch(error) {
        res.status(500).json({
        msg:"hubo un error obteniendo los datos",
        error:error
    })
}
}

exports.edit = async(req,res) => {
    const {id} = req.params
    const {nombre, domicilio, telefono} = req.body
    try {
        const updatedStore = await Store.findByIdAndUpdate(
            id,
            {nombre, domicilio, telefono},
            {new: true})

            res.json({
                msg:"Tienda actualizada con éxito",
                data: updatedStore
            })
        } catch(error){
            console.log(error)
            res.status(500).json({
                msg:"Hubo un error en la actualización de la tienda",
                error: error
            })
        }
}