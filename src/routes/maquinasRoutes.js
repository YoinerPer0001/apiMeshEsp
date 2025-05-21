import express from "express"
import maquinasController from "../controller/maquinasController.js"
import {FlagqueryValidatorNode, IdqueryValidator, IdqueryValidatorNode} from '../validators/general/generalValidator.js'

const MaquinasRoutes = express.Router()

MaquinasRoutes.get("/maquinas", maquinasController.getAll)

MaquinasRoutes.get("/maquina", IdqueryValidator, maquinasController.getById)

MaquinasRoutes.get("/powerhanddle", FlagqueryValidatorNode , IdqueryValidatorNode, maquinasController.powerHandleMachine)

export default MaquinasRoutes