import { Server, Socket } from "socket.io";
import { PanelController } from "../controllers/PanelControlller";
   
class PanelRuta{

 static configuracionPanelSocket (io: Server)  {
        io.on("connection",(socket:Socket)=>{
            socket.on("connectado",(data)=>{ console.log("Mensaje de Cliente",data);
            const msg= "Un cliente conectado"+data.data
socket.broadcast.emit("respuesta",{msg});    
        })  
 
        })



        // io.of("/panel").on('connect ion', (socket: Socket) => {
        //     socket.on('data', (data: object) => PanelController.enviarData(data, socket))
        //     socket.on('moviendoData', () => PanelController.moviendoData(socket))
        //     socket.on('disconnect', () => PanelController.desconeccionCliente(socket))
        // })
        
    }

}

export {PanelRuta}


