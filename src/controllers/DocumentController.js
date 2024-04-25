const session = require("express-session");
const { Document } = require("../models/Document");
const { clientPsql } = require("../database/db_psql");
const { Project } = require("../models/Project");

const DocumentController = {

    save: async (req, res) => {
        // Recupera los datos JSON del cuerpo de la solicitud
        const data = req.body.data;
        const nombreProyecto = req.body.nombreProyecto;
        // Responde al cliente con un mensaje de éxito

        try {
            const projectId = await Project.guardarProject(nombreProyecto, req.session.userId)
            const newDocument = {
                project_id: projectId,
                data: data
            };
            console.log(newDocument);
            await Document.create(newDocument);
            return res.status(200).json({ message: 'Documento guardado exitosamente', document: newDocument });
        } catch (error) {
            console.error('Error al guardar el documento:', error);
            res.status(500).json({ error: 'Error al guardar el documento en la base de datos' });
        }
        //crear nuevo en mongo 
        res.render("index", { title: "Diagramador de secuencia" });
    },

    getData: async (req, res) => {
        try {
            const projectId = req.params.projectId;

            const data = await Document.getDocumentData(projectId)
            res.json({ data: typeof data === 'string' ? JSON.parse(data) : data });
        } catch (error) {
            console.error(error);
        }

    },
    gets: async (req, res) => {
        const documents = Document.getDocuments(req.session.userId)
        res.status(200).json({ documents: documents });

    },

}
module.exports = { DocumentController }