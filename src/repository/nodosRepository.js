import Alertas from "../model/alertas.js";
import Nodos from "../model/nodos.js";
import Sensores from "../model/sensores.js";


class NodosRepository {
    async getById(id){
        const response = await Nodos.findByPk(id, {include: {model: Sensores, as : "sensores", include : {model: Alertas, as: "alertas"}}})
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