import { Socket } from "socket.io";
import { Request,Response } from "express";
class PanelController {
    constructor() {  }

    static index(req:Request,res:Response){
       res.render("panel/panel",{title:"Digrama de secuencia"})
    }
    static enviarData(data: Object, socket: Socket) {
        console.log("una data recibida a /panel " + data);
    }
    static moviendoData(socket: Socket) {
        console.log("estan moviendo data");

    }  static desconeccionCliente(socket: Socket) {
        console.log("Cliente desconectado /panel");

    }

}

export { PanelController }