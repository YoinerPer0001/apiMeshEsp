import maquinasService from "../services/maquinasService.js";
import clientMqtt from '../core/ClientMqtt.js'
import nodosService from "../services/nodosService.js";


class MaquinasController {
    async getAll(req, res) {
        try {

            const response = await maquinasService.getAll()
            res.status(200).json(response)
        } catch (error) {
            console.error(error.message)
            res.status(500).json({ error: error.message })
        }
    }

    async getById(req, res) {
        try {
            const { id } = req.query
            const response = await maquinasService.getById(id)
            res.status(response.code).json(response.response)
        } catch (error) {
            console.error(error.message)
            res.status(500).json({ error: error.message })
        }
    }

    async powerHandleMachine(req, res) {
        try {
            const { id } = req.query
            const { flag } = req.query



            const status = flag == 1 ? "activo" : "inactivo"

            const nodo = await nodosService.getByMachine(id)

            if (!nodo) {
                res.sendStatus(404)
                return
            }

            const updated = await maquinasService.updateMachine({ status: status }, id)

            if (updated) {
                const data = {
                    id: nodo.response.id,
                    flag: flag
                }

                console.log(data)

                clientMqtt.publish("testtopic/power", JSON.stringify(data))

                res.sendStatus(200)
                return
            } else {
                res.sendStatus(500)
                return
            }



        } catch (error) {
            console.error(error.message)
            res.status(500).json({ error: error.message })
        }
    }

    async addNew(req, res) {
        try {
            const data = req.body
            console.log(data)
            const response = await maquinasService.create(data)

            res.status(response.code).json(response.response)
            
        } catch (error) {
            console.error(error.message)
            res.status(500).json({ error: error.message })
        }
    }
}

export default new MaquinasController();