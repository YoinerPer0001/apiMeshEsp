import maquinasService from "../services/maquinasService.js";
import clientMqtt from '../core/ClientMqtt.js'


class MaquinasController {
    async getAll(req, res) {
        try {
         
            const response = await maquinasService.getAll()
            res.status(200).json(response)
        } catch (error) {
            console.error(error.message)
            res.status(500).json({error: error.message})
        }
    }

    async getById(req, res){
        try {
            const {id} = req.query
            const response = await maquinasService.getById(id)
            res.status(response.code).json(response.response)
        } catch (error) {
            console.error(error.message)
            res.status(500).json({error: error.message})
        }
    }

    async powerHandleMachine(req, res){
        try {
            const {id} = req.query
            const {flag} = req.query

            const data = {
                nodo_id : id,
                flag: flag
            }

            clientMqtt.publish("testtopic/power",JSON.stringify(data))

            res.sendStatus(200)

        } catch (error) {
            console.error(error.message)
            res.status(500).json({error: error.message})
        }
    }
}

export default new MaquinasController();