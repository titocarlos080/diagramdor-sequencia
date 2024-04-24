const express = require("express");
const { HomeController } = require("./controllers/HomeController")
const { PanelController } = require("./controllers/PanelControlller");
const { UserController } = require("./controllers/UserController");
const { DocumentController } = require("./controllers/DocumentController");
const Rutas = express.Router();
const requireLogin = (req, res, next) => {
    if (req.session.userId) {
        next();
    } else {
        res.redirect('/');
    }
};


Rutas.get("/", HomeController.index);
Rutas.post('/login', HomeController.login);
Rutas.get("/panel/project/:userId", requireLogin, PanelController.index);
Rutas.get("/panel",requireLogin ,PanelController.index);
Rutas.post('/logout', HomeController.logout);
Rutas.post("/save_document",DocumentController.save);
Rutas.get("/get_document/:projectId",DocumentController.getData);

module.exports = { Rutas };
