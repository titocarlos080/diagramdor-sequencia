const { clientPsql } = require("../database/db_psql");
const { client } = require("../database/dbmongo");

class Document {
    constructor() {

    }
    static async create(newDocument) {
        const database = await client.db('parcial1')
        const collection = await database.collection('documents');
        const result = await collection.insertOne(newDocument);
    }
    static async getDocuments(userId) {
        try {
            const sql = "SELECT * FROM projects WHERE user_id = $1";
            const result = await clientPsql.query(sql, [userId]);
            const projects = result.rows;
            return projects;
        } catch (error) {
            console.error('Error al obtener los proyectos:', error);
            throw new Error('Error al obtener los proyectos de la base de datos');
        }
    }


    static async getDocumentData(projectId) {
        try {
            const database = client.db('parcial1');
            const collection = database.collection('documents');
            const id = projectId;
            const document = await collection.findOne({ 'project_id': id * 1 });
            if (!document) {
                console.log('Document not found');
                return null; // or throw an error if needed
            } return document.data;
        } catch (error) {
            console.error('Error al obtener el documento:', error);
            throw new Error('Error al obtener el documento');
        }
    }


}








module.exports = { Document };
