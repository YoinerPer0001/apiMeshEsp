import mqtt from "mqtt";

const connectUrl = "mqtt://broker.emqx.io:1883"

const clientId = `mqtt_${Math.random().toString(16).slice(3)}`

const clientMQTT = mqtt.connect(connectUrl, {
    clientId,
    clean: true,
    connectTimeout: 4000,
    username: 'yoiner',
    password: 'Yoiner19',
    reconnectPeriod: 1000,
  })


clientMQTT.on('connect', () => {
console.log('Connected')
})

export default clientMQTT