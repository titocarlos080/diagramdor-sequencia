const { GeneradorCode } = require("../controllers/GenerarCode");
const { SalaController } = require("../controllers/SalaController");

function getUsersInRoom(roomId, io) {
    const room = io.sockets.adapter.rooms.get(roomId);
    if (room) {
        return Array.from(room);
    } else {
        return [];
    }
}

const PanelRuta = {

    configuracionPanelSocket: (io) => {
        io.on("connection", (socket) => {

            socket.on('cliente:crearSala', async (nombreSala, userId) => {
                try {
                    // Crear la sala
                    const salaId = await SalaController.crearSala(nombreSala, userId);
                    // Unirse al socket a la sala
                    socket.join(salaId);
                    console.log(`Usuario ${socket.id} ha creado y se ha unido a la sala "${nombreSala}"`);

                    // Emitir un evento de confirmación al cliente que creó la sala
                    socket.emit('servidor:confirmacion', { mensaje: `Sala "${nombreSala}" creada y usuario unido` });

                    // Obtener la lista de usuarios en la sala y emitirla a todos los usuarios en esa sala
                    const usersInRoom = getUsersInRoom(salaId, io);
                    io.to(salaId).emit('servidor:usuariosEnSala', { usuarios: usersInRoom });
                } catch (error) {
                    console.error('Error al crear la sala:', error);
                    socket.emit('servidor:error', { mensaje: `Error al crear la sala: ${error.message}` });
                }
            });
            socket.on("cliente:conect", (SalaActual, SalaAnterior) => {
                if (SalaAnterior) {
                    socket.leave(SalaAnterior);
                    console.log(`Usuario ${socket.id} ha salido de la sala "${SalaAnterior}"`);
                }
                socket.join(SalaActual);
                console.log(`Usuario ${socket.id} se ha unido a la sala "${SalaActual}"`);
                socket.emit("servidor:cambioSala", SalaActual);
            });


            socket.on('cliente:unirSala', (nombreSala) => {
                socket.join(nombreSala);
                console.log(`Usuario ${socket.id} se ha unido a la sala "${nombreSala}"`);
            });

            socket.on("cliente:connectado", (data) => {
                console.log("Mensaje de Cliente", data);
                // socket.broadcast.emit("servidor:respuesta", { msg });
            });
            socket.on("cliente:generarJava", (datas) => {
                const codigo = GeneradorCode.java(JSON.parse(datas))
                socket.emit("servidor:generadoJava", codigo)
            })
            socket.on("cliente:generarCPluss", (datas) => {
                const codigo = GeneradorCode.cpluss(JSON.parse(datas))
                socket.emit("servidor:generadoCPluss", codigo)
            })
            socket.on("cliente:generarPhp", (datas) => {
                const codigo = GeneradorCode.php(JSON.parse(datas))
                socket.emit("servidor:generadoPhp", codigo)
            })
            socket.on("cliente:generarJavaScript", (datas) => {
                const codigo = GeneradorCode.javascript(JSON.parse(datas))
                socket.emit("servidor:generadoJavaScript", codigo)
            })


            socket.on("cliente:datosMovidos", (datosMovidos, SalaActual) => {
                // Envía los datos movidos solo a los clientes dentro de la sala específica, incluyendo al cliente actual
                socket.to(SalaActual).emit("servidor:redibujarDiagrama", datosMovidos);
            });
        });
    }
}

module.exports = { PanelRuta };
