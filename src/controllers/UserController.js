const { User } = require("../models/User");

const UserController = {

    get: () => {
        const userId = 123;
        const user = User.getUserById(id)

        console.log(user);

    },

    
    login: (req, res) => {
        res.render("index", { title: "Diagramador de secuencia" });
    }
}

module.exports = { UserController }