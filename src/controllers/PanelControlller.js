const { Document } = require("../models/Document");

const PanelController = {


    index: async (req, res) => {
    
       const documents = await Document.getDocuments(req.session.userId)
        console.log("--------------------------------------------------------");
        console.log(documents);
        console.log("--------------------------------------------------------");
        res.render("panel/panel", { title: "Digrama de secuencia" , user: req.session.user ,documents:documents})
    },
    enviarData: (data,) => {
        console.log("una data recibida a /panel " + data);
    },
    moviendoData: () => {
        console.log("estan moviendo data");

    }, desconeccionCliente: () => {
        console.log("Cliente desconectado /panel");

    }

}

module.exports = { PanelController }