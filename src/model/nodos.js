import db from "../core/db.js";
import { DataTypes, Model, UUIDV4 } from "sequelize";
import Maquinas from "./maquinasModel.js";

class Nodos extends Model {}

Nodos.init({
    id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
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
        defaultValue: "activo"
    },
    descripcion: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    fecha_instalacion: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: () => {
            const timestampInBogota = Date.now();
            return timestampInBogota;
        }
    }
}, {sequelize: db, modelName: "nodos"})

Maquinas.hasMany(Nodos, {foreignKey: "maquina_id", as: "nodos"})
Nodos.belongsTo(Maquinas, {foreignKey: "maquina_id", as: "maquina"})

export default Nodos