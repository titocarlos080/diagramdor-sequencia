const express = require("express");
const bodyParser = require('body-parser');
 const http = require("http");
const path = require("path");
const session =require("express-session")
const { Server: SocketIOServer } = require("socket.io");
const { PanelRuta } = require("./sockets/panelSocketServer");
const { Rutas } = require("./routes");

const app = express();
const server = http.createServer(app);
const io = new SocketIOServer(server);
// Configuración de la sesión
app.use(session({
  secret: 'secreto', // Cambia esto por una cadena segura
  resave: true,
  saveUninitialized: true,
  cookie: { maxAge: 1800000 } // 30 minutos de inactividad
}));
app.use((req, res, next) => {
  if (req.session) {
    req.session.touch();
  }
  next();
});

// Middleware para verificar la sesión
 
 
// parse application/json
app.use(bodyParser.json());
// Configura el middleware para servir archivos estáticos desde la carpeta 'public'
app.use(express.static(path.join(__dirname, 'public')));
// Middleware para manejar solicitudes JSON y URL codificadas
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Configura la carpeta de vistas y el motor de plantillas EJS
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
// Agrega las rutas definidas en el archivo 'routes.ts'
app.use("/", Rutas);

// Configura el servidor Socket.IO para la ruta '/Panel'
PanelRuta.configuracionPanelSocket(io);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
// sudo iptables -A PREROUTING -t nat -i eth0 -p tcp --dport 80 -j REDIRECT --to-port 3000


//yG0ByAGD3KZBKYks