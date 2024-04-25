const { Sala } = require("../models/Sala");


// Controlador para manejar las solicitudes relacionadas con las salas
const SalaController = {
    // Endpoint para crear una nueva sala
    createSala: async (req, res) => {
        const { salaName, userId } = req.body;
        try {
            const newSala = await Sala.createSala(salaName, userId);
            res.status(201).json(newSala);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    crearSala: async (salaName, userId) => {
        try {
             
            const salaId = await Sala.createSala(salaName, userId);
             return salaId
        } catch (error) {
            return null
        }
    },

    // Endpoint para obtener todas las salas de un usuario
    getSalas: async (req, res) => {
        const { userId } = req.params;
        try {
            const salas = await Sala.getSalas(userId);
            res.status(200).json(salas);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Endpoint para obtener una sala específica de un usuario
    getSala: async (req, res) => {
        const { userId, salaId } = req.params;
        try {
            const sala = await Sala.getSala(userId, salaId);
            if (sala) {
                res.status(200).json(sala);
            } else {
                res.status(404).json({ message: 'Sala no encontrada' });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};

module.exports = { SalaController };
