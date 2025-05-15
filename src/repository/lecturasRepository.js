import Lecturas from '../model/lecturas.js'
import Maquinas from '../model/maquinasModel.js'
import Nodos from '../model/nodos.js'
import Sensores from '../model/sensores.js'

const dataExclude = ["id", "sensor_id", "createdAt", "updatedAt"]

class LecturasRepository {

    async getAll() {
        const response = await Lecturas.findAll()
        return response
    }

    async getById(id) {
        const response = await Lecturas.findByPk(id)
        return response
    }

    async create(data) {
        const response = await Lecturas.create(data)
        return response
    }

    async getAllData() {
        const response = await Lecturas.findAll(
            {
                attributes: { exclude: dataExclude }, include: {
                    model: Sensores, as: "sensor", attributes: { exclude: dataExclude },
                    include: { model: Nodos, as: "nodo", attributes: {exclude: dataExclude }, include: { model: Maquinas, as: "maquina", attributes: { exclude: dataExclude } } }
                }
            })

            const newData = []
        
            for(let res of response){
                const obj = {
                    valor: res.valor,
                    sensor: res.sensor.tipo,
                    etiqueta: res.etiqueta,
                    maquina : res.sensor.nodo.maquina.modelo
                }
                newData.push(obj)
            }
        return newData
    }

    async update(data, id) {
        const response = await Lecturas.update(data, { where: { id: id } })
        return response
    }
}

export default new LecturasRepository()