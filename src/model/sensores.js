import db from "../core/db.js";
import { DataTypes, Model, UUIDV4 } from "sequelize";
import Nodos from "./nodos.js";

class Sensores extends Model {}

Sensores.init({
    id: {
        type: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
        defaultValue: UUIDV4
    },
    nombre: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    tipo: {
        type: DataTypes.ENUM("Vibración", "Temperatura", "Corriente", "Humedad"),
        allowNull: false,
    },
    unidad : {
        type: DataTypes.ENUM("g", "°C", "A", "H"),
        allowNull: false,
    },
    nodo_id: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {sequelize: db, modelName: "sensores"})

Nodos.hasMany(Sensores, {foreignKey: "nodo_id", as : "sensores"})
Sensores.belongsTo(Nodos, {foreignKey: "nodo_id", as : "nodo"})

export default Sensores