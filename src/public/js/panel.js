// Crea una instancia de socket.io
let socket = io();

// Escucha el evento 'respuesta' del servidor y muestra la respuesta en una alerta
socket.on('servidor:respuesta', (data) => {
  //  alert(data.msg);   
});

// Obtiene el sistema operativo del cliente y lo envía al servidor cuando se conecta
var sistemaOperativo = navigator.platform;
console.log("Sistema Operativo: " + sistemaOperativo);
socket.emit("cliente:connectado", myDiagram.model.toJson());

// Define una función para enviar los datos al servidor
function sendDataToServer(data) {
  // Envía los datos al servidor a través del socket
  socket.emit("cliente:datosMovidos", data);
}

// Agrega un listener al evento "SelectionMoved" del diagrama para capturar cuando se mueven elementos
myDiagram.addDiagramListener("SelectionMoved", function (e) {
  // Envía los datos al servidor después de que se haya movido la selección
  sendDataToServer(myDiagram.model.toJson());
});

// Agrega un listener al evento "ChangedSelection" del diagrama para capturar cuando se cambia la selección
myDiagram.addDiagramListener("ChangedSelection", function (e) {
  // Envía los datos al servidor después de que se haya cambiado la selección
  sendDataToServer(myDiagram.model.toJson());
});

// Escucha el evento 'redibujarDiagrama' del servidor y redibuja el diagrama con los nuevos datos
socket.on('sevidor:redibujarDiagrama', (data) => {
  myDiagram.model = go.Model.fromJson(data);

});

///------------------------------------------------------------------------------------------------

