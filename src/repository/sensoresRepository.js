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
        const response = await Sensores.findByPk(id)
        return response
    }

}

export default new SensoresRepository()