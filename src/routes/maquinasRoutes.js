import express from "express"
import maquinasController from "../controller/maquinasController.js"

const MaquinasRoutes = express.Router()

MaquinasRoutes.get("/maquinas", maquinasController.getAll)

export default MaquinasRoutes