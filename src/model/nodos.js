import db from "../core/db.js";
import { DataTypes, Model, UUIDV4 } from "sequelize";
import Maquinas from "./maquinasModel.js";

class Nodos extends Model {}

Nodos.init({
    id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
        defaultValue: UUIDV4
    },
    nombre: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    maquina_id: {
        type: DataTypes.UUIDV4,
        allowNull: false,
    },
    estado: {
        type: DataTypes.ENUM("activo", "inactivo"),
        allowNull: false,
    },
    fecha_instalacion: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: () => {
            const timestampInBogota = DateTime.now();
            return timestampInBogota;
        }
    }
}, {sequelize: db, modelName: "nodos"})

Maquinas.hasMany(Nodos, {foreignKey: "maquina_id", as: "maquina"})
Nodos.belongsTo(Maquinas, {foreignKey: "maquina_id", as: "maquina"})

export default Nodos