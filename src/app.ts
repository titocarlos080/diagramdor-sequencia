// app.ts
import express from "express";
import http from "http";
import path from "path";
import { Server as SocketIOServer } from "socket.io";
import { PanelRuta } from "./sockets/panelSocketServer";
import {Rutas  } from "./routes"
const app = express();
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(Rutas); 
const server = http.createServer(app);
const io = new SocketIOServer(server);

// Configurar servidor Socket.IO para la ruta /Panel
PanelRuta.configuracionPanelSocket(io);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
