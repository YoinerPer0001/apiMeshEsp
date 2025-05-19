import maquinasService from "../services/maquinasService.js";


class MaquinasController {
    async getAll(req, res) {
        try {
            console.log("llego")
            const response = await maquinasService.getAll()
            res.status(200).json(response)
        } catch (error) {
            console.error(error.message)
            res.status(500).json({error: error.message})
        }
    }
}

export default new MaquinasController();