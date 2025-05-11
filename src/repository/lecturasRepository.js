import Lecturas from '../model/lecturas.js'

class LecturasRepository {

    async getAll(){
        const response = await Lecturas.findAll()
        return response
    }

    async getById(id){
        const response = await Lecturas.findByPk(id)
        return response
    }

    async create(data){
        const response= await Lecturas.create(data)
        return response
    }

    async update(data, id){
        const response = await Lecturas.update(data,{where: {id: id}})
        return response
    }
}

export default new LecturasRepository()