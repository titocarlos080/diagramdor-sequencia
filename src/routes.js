const express = require("express");
const {HomeController} = require("./controllers/HomeController")
const {PanelController} = require("./controllers/PanelControlller")
const Rutas = express.Router();
Rutas.get("/",  HomeController.index  );
Rutas.get("/panel",  PanelController.index );


module.exports = { Rutas };
