const { User } = require("../models/User");

const UserController = {

    get: () => {
        const userId = 123;
        const user = User.getUserById(id)

        console.log(user);

    },
     register: (req, res) => {
       
        try {
            const neaUser={
                userName:req.body.name, 
                userEmail:req.body.email,
                userPass:req.body.password
           }
           const user = User.create(neaUser)
           res.status(201).send({user:neaUser})   
        } catch (error) {
            res.status(500).send({error:error})   


        }  

    },
    
    
    login: (req, res) => {
        res.render("index", { title: "Diagramador de secuencia" });
    }
}

module.exports = { UserController }