const Guitar = require("./../models/Guitar")
exports.create = async(req,res) => {
    //del formulario, creamos variables y asignamos valores
    const {
        nombre,
        precio,
        color,
        imagen,
        description
    } = req.body

    //crear una guitarra en base de datos
//try-catch es en un proceso asíncrono, si existe algún problema
    try{
const newGuitar = await Guitar.create({
    nombre,
    precio,
    color,
    imagen,
    description
})

//devolver una respuesta en formato json
res.json({
    msg: "Guitarra creada con éxito",
    data: newGuitar

})

    } catch(error) {
        console.log(error)
res.status(500).json({
    msg: "Hubo un error creando la guitarra",
    error //o error:error, cuando el valor es el mismo que la referencia se puede quitar
})
//el 500 es el que muestra el error
    }
}

exports.readAll =async(req,res) => {
try{
    const guitars = await Guitar.find({})
    res.json({
        msg:"Guitarras obtenidas",
        data:guitars
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
        const guitar = await Guitar.findById(id)
        res.json({
            msg:"Guitarra obtenida con éxito",
            data:guitar
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
    const {nombre, precio, color, imagen, description} = req.body
    try {
        const updatedGuitar = await Guitar.findByIdAndUpdate(
            id,
            {nombre, precio, color, imagen, description},
            {new: true})

            res.json({
                msg:"Guitarra actualizada con éxito",
                data: updatedGuitar
            })
        } catch(error){
            res.status(500).json({
                msg:"Hubo un error en la actualización de la guitarra",
                error
            })
        }
}

exports.delete = async(req,res) => {
    const {id} = req.params
    try {
        const deletedGuitar = await Guitar.findByIdAndDelete({_id:id})
        res.json({
            msg:"Guitarra borrada con éxito",
            data:deletedGuitar
        })
    } catch(error){
        res.status(500).json({
            msg:"Hubo un error en la actualización de la guitarra",
            error
        })
    }
}