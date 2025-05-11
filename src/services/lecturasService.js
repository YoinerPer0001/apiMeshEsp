import lecturasRepository from "../repository/lecturasRepository.js"
import nodosService from './nodosService.js'
import sensoresService from './sensoresService.js'

class LecturaService {

    async getAll(){
        const response = await lecturasRepository.getAll()
        return response
    }

    async getById(id){
        const response = await lecturasRepository.getById(id)
        if(!response){
           return {code: 404, response: 'not found'} 
        }
        return {code: 200, response: response} 
    }

    async create(data){

        //VERIFICAR A QUE NODO PERTENECE
        const nodoExist = await nodosService.getById(data.id)

        if(nodoExist.code != 200){
            return {code: 404, response: 'Node not found'} 
        }

        const sensores = await sensoresService.getAllxNodo(data.id)

        let newData = {
            sensor_id: null,
            valor: null
        };

        let code = 200;

        for (const sensor of sensores) {
            switch (sensor.tipo) {
                case "Temperatura":
                    if(data.sensores.Temperatura != null){
                        console.log("tempera")
                        newData.sensor_id = sensor.id
                        newData.valor = data.sensores.Temperatura
                        
                    }
                    break;
                case "Vibración":
                    if(data.sensores.Vibración != null){
                        console.log("vib")
                        newData.sensor_id = sensor.id
                        newData.valor = data.sensores.Vibración
                       
                    }
                    
                    break;
                case "Corriente":
                    if(data.sensores.Corriente != null){
                        console.log("corr")
                        newData.sensor_id = sensor.id
                        newData.valor = data.sensores.Corriente
                        
                    }
                    break;
                default:
                    break;
            }

            const response= await lecturasRepository.create(newData)
            if(!response){
                code = 500
            }
          
        }

        
        
         return {code: code} 
    }

    async update(data, id){
        const exist = await this.getById(id)
        if(exist.code != 200){
            return exist
        }
        const response = await lecturasRepository.update(data, id)
        if(!response){
            return {code: 500, response: 'Error to update'} 
         }
         return {code: 200, response: response} 
    }
}

export default new LecturaService();