import db from "../core/db.js";
import { DataTypes, Model, UUIDV4 } from "sequelize";
import Sensores from "./sensores.js";

class Lecturas extends Model {}

Lecturas.init({
    id: {
        type: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
        defaultValue: UUIDV4
    },
    sensor_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    valor :{
        type: DataTypes.DOUBLE,
        allowNull: false,
    },
    timestamp: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: () => {
            const timestampInBogota = Date.now();
            return timestampInBogota;
        }
    },
    etiqueta:{
        type: DataTypes.STRING,
        allowNull: true,
    }
}, {sequelize: db, modelName: "lecturas"})

Sensores.hasMany(Lecturas, {foreignKey: "sensor_id", as: "sensor"})
Lecturas.belongsTo(Sensores, {foreignKey: "sensor_id", as: "sensor"})

export default Lecturas