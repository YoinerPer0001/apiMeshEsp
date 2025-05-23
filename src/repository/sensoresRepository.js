import Alertas from "../model/alertas.js";
import Maquinas from "../model/maquinasModel.js";
import Nodos from "../model/nodos.js";
import Sensores from "../model/sensores.js";

class SensoresRepository {
    async getAllxNodo(id){
        const response = await Sensores.findAll({where:{nodo_id: id}})
        return response
    }

    async create(data){
        const response = await Sensores.create(data)
        return response
    }

    async getById(id){
        const response = await Sensores.findByPk(id,{include: [{model: Nodos, as: "nodo", include : {model: Maquinas, as: "maquina"}},{model: Alertas, as: "alertas"}]})
        console.log(response.dataValues)
        return response
    }

}

export default new SensoresRepository()