import {Request,Response } from "express";

class HomeController {

    static index(req:Request, res:Response) {
         res.render("index",{title:"Diagramador de secuencia"});
    }
}

export  {HomeController}