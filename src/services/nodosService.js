import nodosRepository from '../repository/nodosRepository.js'
class NodosService {
    async getById(id){
        const response = await nodosRepository.getById(id)
        if(!response){
            return {code: 404, response: 'not found'}
        }
        return {code: 200, response: response}
    }
}

export default new NodosService()