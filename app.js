import express from 'express'
import db from './src/core/db.js'
import lecturasRoutes from './src/routes/lecturaRoutes.js'
import cors from 'cors'

const app = express()

app.use(express.json());

app.use(cors())

const initialPath = "/api"
app.use(initialPath, lecturasRoutes)


app.listen('0.0.0.0', ()=>{
    console.log("app success port: 3000" )
})