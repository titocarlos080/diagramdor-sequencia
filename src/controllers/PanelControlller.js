const { Document } = require("../models/Document");
const { Sala } = require("../models/Sala");

const PanelController = {


    index: async (req, res) => {
        const documents = await Document.getDocuments(req.session.userId)
      
        const salas = await Sala.getSalas(req.session.userId)
       
        res.render("panel/panel", { title: "Digrama de secuencia", user: req.session.user, documents: documents, salas: salas })
    },
    enviarData: (data) => {
        console.log("una data recibida a /panel " + data);
    },
    moviendoData: () => {
        console.log("estan moviendo data");

    }, desconeccionCliente: () => {
        console.log("Cliente desconectado /panel");

    }

}

module.exports = { PanelController }