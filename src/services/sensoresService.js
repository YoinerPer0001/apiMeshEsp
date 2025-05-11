import sensoresRepository from '../repository/sensoresRepository.js'

class SensoresService {
    async getAllxNodo(id){
        const response = await sensoresRepository.getAllxNodo(id)
        return response
    }
}

export default new SensoresService()