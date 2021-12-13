// 1. IMPORTACIONES
const express       = require("express")
const app           = express()
require("dotenv").config()
const connectDB = require("./config/db")

// 2. MIDDLEWARES
//todas las peticiones y respuestas se manejan en protocolo json
connectDB()
app.use(express.json())


// 3. RUTAS
app.use("/guitars", require("./routes/guitars"))
app.use("/stores", require("./routes/stores"))

// 4. SERVIDOR
app.listen(process.env.PORT, () => {
    console.log(`servidor trabajando en puerto ${process.env.PORT}`)
})