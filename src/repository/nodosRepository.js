import Nodos from "../model/nodos.js";


class NodosRepository {
    async getById(id){
        const response = await Nodos.findByPk(id)
        return response
    }
}

export default new NodosRepository()