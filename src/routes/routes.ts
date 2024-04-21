import express from "express";
import { HomeController } from "../controllers/HomeController";
import { PanelController } from "../controllers/PanelControlller";
 
const Rutas = express.Router();
router.get("/",HomeController.index);
router.get("/panel",PanelController.index );
 

export { Rutas }