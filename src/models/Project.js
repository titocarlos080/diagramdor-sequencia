const { clientPsql } = require("../database/db_psql")

class Project {
    constructor(){

    }
    static async guardarProject(nombreProyecto, userId) {
        try {
            const sql = "INSERT INTO projects (project_name, user_id) VALUES ($1, $2) RETURNING project_id";
            const result = await clientPsql.query(sql, [nombreProyecto, userId]);
            const projectId = result.rows[0].project_id;
            console.log("Proyecto guardado correctamente. ID del proyecto:", projectId);
            return projectId;
        } catch (error) {
            console.error('Error al guardar el proyecto:', error);
            throw new Error('Error al guardar el proyecto en la base de datos');
        }
    }
    
    
}


module.exports= {Project}