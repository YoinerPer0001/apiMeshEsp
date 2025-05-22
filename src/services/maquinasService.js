import maquinasRepository from "../repository/maquinasRepository.js";
import nodosService from "./nodosService.js";
import sensoresService from "./sensoresService.js";

class MaquinasServices {
    async getAll(){
        const response = await maquinasRepository.getAll()
        return response
    }

    async getById(id){
        const response = await maquinasRepository.getById(id)
        if(!response){
            return {code: 404, response: "not found"}
        }
        return {code: 200, response: response}
    }

    async updateMachine(data, id){
        console.log(data)
        const exist = await this.getById(id)
        if(exist.code != 200){
            return exist.response
        }
        const response = maquinasRepository.update(data, id)
        return {code: 200, response: response}
    }

    async create(data){

        let error = 0

        const dataMachine = {
            nombre : data.nombre,
            modelo : data.modelo
        }

        const createdMachine = await maquinasRepository.create(dataMachine)

        if(!createdMachine){
            return {code: 500, response: "error to create"}
        }

        const nodos = data.nodos

        for(const nodo of nodos){
            const dataNodos = {
                id: nodo.mac,
                maquina_id: createdMachine.id,
                nombre: nodo.nombre,
                descripcion: nodo.descripcion
            }
            const nodoCreated = await nodosService.create(dataNodos)
            if(nodoCreated.code != 200){
                await maquinasRepository.destroy(createdMachine.id)
                error +1
                break
            }
            const sensores = nodo.sensores

            for(const sensor of sensores){
                const dataSensor = {
                    nodo_id: nodoCreated.response.id,
                    nombre: sensor.nombre,
                    tipo: sensor.tipo,
                    unidad: sensor.unidad
                }
                await sensoresService.create(dataSensor)
            }
        }

        if(error != 0){
            return {code: 500, response: "Error to create"}
        }

        return {code: 200, response: createdMachine}
    }
}

export default new MaquinasServices()