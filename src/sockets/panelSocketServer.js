
const PanelRuta = {
    
    configuracionPanelSocket: (io) => {
        io.on("connection", (socket) => {

            socket.on("cliente:connectado", (data) => {
                console.log("Mensaje de Cliente", data);
             
               // socket.broadcast.emit("servidor:respuesta", { msg });

            });
            socket.on("cliente:datosMovidos", (datosMovidos) => {
            
                socket.broadcast.emit("sevidor:redibujarDiagrama", (datosMovidos))
            });



        });
    }
}

module.exports = { PanelRuta };
