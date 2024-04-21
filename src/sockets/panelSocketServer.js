const PanelRuta = {
    configuracionPanelSocket: (io) => {
        io.on("connection", (socket) => {
            socket.on("connectado", (data) => {
                console.log("Mensaje de Cliente", data);
                const msg = "Un cliente conectado" + data.data;
                socket.broadcast.emit("respuesta", { msg });
            });
        });
    }
}

module.exports = { PanelRuta };
