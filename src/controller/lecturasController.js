import lecturasService from "../services/lecturasService.js"


class LecturasController {

    async getAll(req, res) {
        try {
            const response = await lecturasService.getAll()
            return res.status(200).json(response)
        } catch (error) {
            return res.status(500).json({ error: error.message })
        }
    }

    async getById(req, res) {

        try {
            const { id } = req.query

            const response = await lecturasService.getById(id)
        
            return res.status(response.code).json(response)

        } catch (error) {
            return res.status(500).json({ error: error.message })
        }

    }

    async create(req, res) {
        try {
      
            const data = req.body
            const response = await lecturasService.create(data)
            return res.sendStatus(response.code)

        } catch (error) {
            return res.status(500).json({ error: error.message })
        }
        
    }

    async update(req, res) {
        
        try {
            const {id} = req.query
            const data = req.body

            const response = await lecturasService.update(data, id)
            return res.status(response.code).json(response)

        } catch (error) {
             return res.status(500).json({ error: error.message })
        }
       
    }
}

export default new LecturasController()