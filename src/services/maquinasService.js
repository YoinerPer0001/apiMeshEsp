import maquinasRepository from "../repository/maquinasRepository.js";

class MaquinasServices {
    async getAll(){
        const response = await maquinasRepository.getAll()
        return response
    }
}

export default new MaquinasServices()