import Nodos from "../model/nodos.js";


class NodosRepository {
    async getById(id){
        const response = await Nodos.findByPk(id)
        return response
    }

    async getByMachine(id){
        const response = await Nodos.findOne({where: {maquina_id: id}})
        return response
    }

    async create(data){
        const response = await Nodos.create(data)
        return response
    }
}

export default new NodosRepository()