
const PanelController = {


    index: (req, res) => {
    
        res.render("panel/panel", { title: "Digrama de secuencia" })
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