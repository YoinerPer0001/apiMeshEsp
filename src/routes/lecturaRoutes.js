import express from 'express'
import lecturasController from '../controller/lecturasController.js';
import { createValidator } from '../validators/lecturasValidator.js';

const lecturasRoutes = express.Router()

lecturasRoutes.post("/lecturas/crear", createValidator, lecturasController.create)

lecturasRoutes.get("/lecturas/all", lecturasController.getAllData)


export default lecturasRoutes;