import express from "express";
import http from "http";
import path from "path";
import { Server as SocketIOServer } from "socket.io";
import { PanelRuta } from "./sockets/panelSocketServer";
import { Rutas } from "./routes";

const app = express();
const server = http.createServer(app);
const io = new SocketIOServer(server);

// Configura el middleware para servir archivos estáticos desde la carpeta 'public'
app.use(express.static(path.join(__dirname, 'public')));
// Middleware para manejar solicitudes JSON y URL codificadas
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Configura la carpeta de vistas y el motor de plantillas EJS
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
// Agrega las rutas definidas en el archivo 'routes.ts'
app.use(Rutas);

// Configura el servidor Socket.IO para la ruta '/Panel'
PanelRuta.configuracionPanelSocket(io);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
