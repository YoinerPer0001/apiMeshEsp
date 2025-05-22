import maquinasRepository from "../repository/maquinasRepository.js";

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
        const exist = await this.getById(id)
        if(exist.code != 200){
            return exist.response
        }
        const response = maquinasRepository.update(data, id)
        return {code: 200, response: response}
    }
}

export default new MaquinasServices()