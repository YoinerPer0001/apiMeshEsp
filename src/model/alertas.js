import db from "../core/db.js";
import { DataTypes, Model, UUIDV4 } from "sequelize";
import Sensores from "./sensores.js";

class Alertas extends Model {}

Alertas.init({
    id: {
        type: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
        defaultValue: UUIDV4
    },
    sensor_id: {
        type: DataTypes.UUIDV4,
        allowNull: false,
    },
    descripcion: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    nivel: {
        type: DataTypes.ENUM("baja", "media", "critica"),
        allowNull: false,
    }
}, {sequelize: db, modelName: "alertas"})

Sensores.hasMany(Alertas, {foreignKey: "sensor_id", as : "sensor"})
Alertas.belongsTo(Sensores, {foreignKey: "sensor_id", as : "sensor"})

export default Alertas
