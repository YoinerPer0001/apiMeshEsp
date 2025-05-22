import Alertas from "../model/alertas.js";
import Maquinas from "../model/maquinasModel.js";
import Nodos from "../model/nodos.js";
import Sensores from "../model/sensores.js";
import Lecturas from '../model/lecturas.js'

const excludeAttrs = ["createdAt", "updatedAt"]

class MaquinasRepository {
    async getAll() {
        const response = await Maquinas.findAll({ attributes: { exclude: excludeAttrs }, include: { model: Nodos, as: "nodos", attributes: { exclude: excludeAttrs }, include: { model: Sensores, as: "sensores", attributes: { exclude: excludeAttrs }, include: { model: Alertas, as: "alertas", } } } })
        return response
    }

    async getById(id) {
        const response = await Maquinas.findOne({
            where: { id: id },
            attributes: { exclude: excludeAttrs },
            include: {
                model: Nodos,
                as: "nodos",
                attributes: { exclude: excludeAttrs },
                include: {
                    model: Sensores,
                    as: "sensores",
                    attributes: { exclude: excludeAttrs },
                    include: [
                        {
                            model: Alertas,
                            as: "alertas"
                        },
                        // {
                        //     model: Lecturas,
                        //     as: "lecturas",
                        //     separate: true,               // <- Importante para que funcione el limit correctamente
                        //     limit: 100,
                        //     order: [['createdAt', 'DESC']]
                        // }
                    ]
                }
            }
        });

        return response;
    }

    async update(data, id) {
        const response = Maquinas.update(data, { where: { id: id } })
        return response
    }

    async create(data) {
        const response = Maquinas.create(data)
        return response
    }

    async destroy(id) {
        const response = await Maquinas.destroy({ where: { id: id } })
        return response
    }

}

export default new MaquinasRepository()