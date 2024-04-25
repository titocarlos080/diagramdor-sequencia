const { clientPsql } = require("./db_psql");

class Sala {
    constructor() {
    }

    static async createSala(salaName, userId) {
        try {
            const query = "INSERT INTO salas (sala_name, user_id) VALUES ($1, $2) RETURNING sala_id";
            const result = await clientPsql.query(query, [salaName, userId]);
            return result.rows[0].sala_id;
        } catch (error) {
            console.error('Error al ejecutar la consulta:', error);
            throw new Error('Error al crear sala: ' + error.message);
        }
    }


    static async getSalas(userId) {
        try {
            const query = 'SELECT * FROM salas WHERE user_id = $1';
            const values = [userId];
            const result = await clientPsql.query(query, values);
            return result.rows;
        } catch (error) {
            throw new Error('Error al obtener salas: ' + error.message);
        }
    }

    static async getSala(userId, salaId) {
        try {
            const query = 'SELECT * FROM salas WHERE user_id = $1 AND sala_id = $2';
            const values = [userId, salaId];
            const result = await clientPsql.query(query, values);
            return result.rows[0];
        } catch (error) {
            throw new Error('Error al obtener sala: ' + error.message);
        }
    }
}

module.exports = { Sala };
