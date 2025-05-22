import nodosRepository from '../repository/nodosRepository.js'
class NodosService {
    async getById(id){
        const response = await nodosRepository.getById(id)
        if(!response){
            return {code: 404, response: 'not found'}
        }
        return {code: 200, response: response}
    }

    async getByMachine(id){
        const response = await nodosRepository.getByMachine(id)
        if(!response){
            return {code: 404, response: 'not found'}
        }
        return {code: 200, response: response}
    }

    async create(data){
        const response = await nodosRepository.create(data)
        if(!response){
            return {code: 500, response: 'error to create'}
        }
        return {code: 200, response: response}
    }

}

export default new NodosService()