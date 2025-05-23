import io from "../app.js"
import Alertas from "../model/alertas.js"
import lecturasRepository from "../repository/lecturasRepository.js"
import maquinasService from "./maquinasService.js"
import nodosService from './nodosService.js'
import sensoresService from './sensoresService.js'

class LecturaService {

    async getAll() {
        const response = await lecturasRepository.getAll()
        return response
    }

    async getAllData() {
        const response = await lecturasRepository.getAllData()
        return response
    }

    async getById(id) {
        const response = await lecturasRepository.getById(id)
        if (!response) {
            return { code: 404, response: 'not found' }
        }
        return { code: 200, response: response }
    }

    async create(data) {

        //VERIFICAR A QUE NODO PERTENECE
        const nodoExist = await nodosService.getById(data.id)

        if (nodoExist.code != 200) {
            return { code: 404, response: 'Node not found' }
        }

        const sensores = await sensoresService.getAllxNodo(data.id)

        let code = 200;


        for (const sensor of sensores) {
            const newData = {}; // ← mover esto aquí para evitar reuso de valores previos

            let valorSensor = null;

            switch (sensor.tipo) {
                case "Temperatura":
                    valorSensor = data.sensores.Temperatura;
                    break;
                case "Vibración":
                    valorSensor = data.sensores.Vibración;
                    break;
                case "Corriente":
                    valorSensor = data.sensores.Corriente;
                    break;
                case "Humedad":
                    valorSensor = data.sensores.Humedad;
                    break;
                default:
                    continue; // ← ignorar sensores no reconocidos
            }

            if (valorSensor == null) continue; // ← ignorar sensores sin valor

            newData.sensor_id = sensor.id;
            newData.valor = valorSensor;
            newData.etiqueta = data.etiqueta;

            console.log(newData);

            const response = await lecturasRepository.create(newData);
            if (!response) {
                code = 500;
            }

            const sensorDb = await sensoresService.getById(response.sensor_id)

            const nodo = await nodosService.getById(sensorDb.response.nodo_id)

            const sensores = nodo.response.sensores

            const alertas = []

            for(const s of sensores){
                console.log(s.alertas)
                alertas.push(s.alertas)
            }


            const DataSend = {
                id_lectura: response.id,
                valor: parseFloat(newData.valor).toFixed(2),
                sensor_id: response.sensor_id,
                nodo_id: sensorDb.response.nodo_id,
                maquina_id: sensorDb.response.nodo.maquina_id,
                alertas: alertas
            }

            //prediction and emmit value
            io.emit("newData", DataSend);

        }

        

        return { code: code }
    }

    async update(data, id) {
        const exist = await this.getById(id)
        if (exist.code != 200) {
            return exist
        }
        const response = await lecturasRepository.update(data, id)
        if (!response) {
            return { code: 500, response: 'Error to update' }
        }
        return { code: 200, response: response }
    }


}

export default new LecturaService();