import express from 'express'
import db from './core/db.js'
import lecturasRoutes from './routes/lecturaRoutes.js'
import cors from 'cors'

const app = express()

app.use(express.json());

app.use(cors())

const initialPath = "/api"
app.use(initialPath, lecturasRoutes)


app.listen(3000,'0.0.0.0', ()=>{
    console.log("app success port: 3000" )
})