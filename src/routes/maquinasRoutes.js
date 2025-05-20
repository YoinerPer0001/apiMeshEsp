import express from "express"
import maquinasController from "../controller/maquinasController.js"
import {IdqueryValidator} from '../validators/general/generalValidator.js'

const MaquinasRoutes = express.Router()

MaquinasRoutes.get("/maquinas", maquinasController.getAll)

MaquinasRoutes.get("/maquina", IdqueryValidator, maquinasController.getById)

export default MaquinasRoutes