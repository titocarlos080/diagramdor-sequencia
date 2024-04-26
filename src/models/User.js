const { clientPsql } = require("../database/db_psql");

class User {

    constructor(){

    }

    static async create(user){
        console.log(user);
        try {
            const query = "INSERT INTO users (user_name, user_email,user_pass) VALUES ($1, $2,$3) RETURNING *";
            const result = await clientPsql.query(query, [user.userName,user.userEmail,user.userPass]);
            return result.rows[0];
        } catch (error) {
            console.error('Error al crear User:', error);
         }

    }

    static   getUserById( id) {
        
        
        return id;
    }

}
module.exports={User}