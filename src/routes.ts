import express from "express";
import { PanelController } from "./controllers/PanelControlller";
import { HomeController } from "./controllers/HomeController";
  
const Rutas = express.Router();
Rutas.get("/",HomeController.index );
Rutas.get("/panel",PanelController.index );
 

export { Rutas }