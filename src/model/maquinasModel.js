import db from "../core/db.js";
import { DataTypes, Model, UUIDV4 } from "sequelize";

class Maquinas extends Model {}

Maquinas.init({
    id: {
        type: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
        defaultValue: UUIDV4
    },
    nombre: {
        type: DataTypes.STRING(250),
        allowNull: false,
    },
    modelo: {
        type: DataTypes.STRING(250),
        allowNull: false,
    }
}, {sequelize: db, modelName: "maquinas"})

export default Maquinas