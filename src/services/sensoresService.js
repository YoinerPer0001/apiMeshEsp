import sensoresRepository from '../repository/sensoresRepository.js'

class SensoresService {
    async getAllxNodo(id){
        const response = await sensoresRepository.getAllxNodo(id)
        return response
    }

    async create(data){
            const response = await sensoresRepository.create(data)
            if(!response){
                return {code: 500, response: 'error to create'}
            }
            return {code: 200, response: response}
        }

    async getById(id){
        const response = await sensoresRepository.getById(id)
        if(!response){
            return {code: 404, response: 'not found'}
        }
        return {code: 200, response: response}
    }
}

export default new SensoresService()