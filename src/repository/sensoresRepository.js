import Sensores from "../model/sensores.js";

class SensoresRepository {
    async getAllxNodo(id){
        const response = await Sensores.findAll({where:{nodo_id: id}})
        return response
    }
}

export default new SensoresRepository()