import Alertas from "../model/alertas.js";
import Maquinas from "../model/maquinasModel.js";
import Nodos from "../model/nodos.js";
import Sensores from "../model/sensores.js";

const excludeAttrs = ["createdAt", "updatedAt"]

class MaquinasRepository {
    async getAll() {
        const response = await Maquinas.findAll({ attributes: { exclude: excludeAttrs }, include: { model: Nodos, as: "nodos", attributes: { exclude: excludeAttrs }, include: { model: Sensores, as: "sensores", attributes: { exclude: excludeAttrs }, include: { model: Alertas, as: "alertas", } } } })
        return response
    }
}

export default new MaquinasRepository()