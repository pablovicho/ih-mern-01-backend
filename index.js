// 1. IMPORTACIONES
const express       = require("express")
const app           = express()
const cors          = require("cors")
require("dotenv").config()
const connectDB = require("./config/db")

// 2. MIDDLEWARES
//todas las peticiones y respuestas se manejan en protocolo json
connectDB()

//habilitar cors: accesos de ambientes de desarrollo de terceros
app.use(cors())
app.use(express.json())


// 3. RUTAS
app.use("/guitars", require("./routes/guitars"))
app.use("/stores", require("./routes/stores"))
app.use("/users", require("./routes/users"))

// 4. SERVIDOR
app.listen(process.env.PORT, () => {
    console.log(`servidor trabajando en puerto ${process.env.PORT}`)
})