import client from "../core/clientDb.js"


try {
    await client.connect();
} catch (error) {
    console.error("error to get client")
}


export async function onNewData(io, socket){

   
    
    await client.query('LISTEN new_lectura_api');
    console.log('🔄 Escuchando NOTIFY en PostgreSQL...');

    client.on('notification', (msg) => {
        console.log('📨 Notificación recibida desde PostgreSQL');
        const data = JSON.parse(msg.payload);
        console.log(data)
        const DataSend = {
            id_lectura : data.lectura.id,
            valor: data.lectura.valor,
            sensor_id : data.lectura.sensor_id,
            nodo_id: data.nodo.id,
            maquina_id: data.maquina.id,
            alertas: data.alertas
        }
        io.emit("newData", DataSend);
    });
    
}

export async function onDisconnect(io, socket){
    socket.on("disconnect", ()=> {
        console.log("user disconnected")
    })
}
