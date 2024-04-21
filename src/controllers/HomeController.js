
const HomeController = {




    index: (req, res) => {
        res.render("index", { title: "Diagramador de secuencia" });
    }
}

module.exports = { HomeController }