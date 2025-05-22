
// export async function onNewData(io, socket){

//     await client.query('LISTEN new_lectura_api');
//     console.log('🔄 Escuchandiii');

//         const data = JSON.parse(msg.payload);
//         console.log(data)
//         const DataSend = {
//             id_lectura : data.lectura.id,
//             valor: data.lectura.valor,
//             sensor_id : data.lectura.sensor_id,
//             nodo_id: data.nodo.id,
//             maquina_id: data.maquina.id,
//             alertas: data.alertas
//         }
//         io.emit("newData", DataSend);
// }

export async function onDisconnect(io, socket){
    socket.on("disconnect", ()=> {
        console.log("user disconnected")
    })
}
