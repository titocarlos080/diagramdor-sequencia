 


// Crea una instancia de socket.io
 
var socket = io.connect('http://localhost:3000');
// Define una función para enviar los datos al servidor
function sendDataToServer(data) {
   
  socket.emit("cliente:datosMovidos", data, obtenerSalaActual());
}

 

// Agrega un listener al evento "ChangedSelection" del diagrama para capturar cuando se cambia la selección
myDiagram.addDiagramListener("ChangedSelection", function (e) {
  // Envía los datos al servidor después de que se haya cambiado la selección
  sendDataToServer(myDiagram.model.toJson());
});

// Escucha el evento 'redibujarDiagrama' del servidor y redibuja el diagrama con los nuevos datos
socket.on('servidor:redibujarDiagrama', (data) => {
 
  myDiagram.model = go.Model.fromJson(data);

});

socket.on('servidor:confirmacion', (data) => {

  alert(data.mensaje); // Muestra una alerta con el mensaje recibido del servidor
});

socket.on('servidor:cambioSala', (SalaActual) => {

  alert("  Te cambiaste a sala " + SalaActual);
});

 
///------------------------------------------------------------------------------------------------
function crearSala() {
  const opcionCrearSala = confirm("¿Desea crear una nueva sala?"); 
  if (opcionCrearSala) {
    const nombreSala = prompt("Nombre de la Sala:");

    // Verificar si el nombre de la sala es válido
    if (nombreSala && nombreSala.trim() !== '') {
      const userId = document.getElementById("userId").value
      socket.emit('cliente:crearSala', nombreSala, userId);

    } else {
      alert('Por favor, ingrese un nombre válido para la sala.');
    }
  }
}

function irASala(id) {
 const salaAnterior= obtenerSalaActual();
   localStorage.setItem("SalaActual", id);
  socket.emit("cliente:conect",obtenerSalaActual(),salaAnterior)
}
function generarUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0,
        v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

function obtenerSalaActual() {
  return localStorage.getItem("SalaActual") || generarUUID();
}











function UniendoSala() {
  const opcionUnirSala = confirm("¿Desea unirse a una nueva sala?");
  if (opcionUnirSala) {
    const nombreSalaUnir = prompt("ID sala:");

    // Verificar si el nombre de la sala es válido
    if (nombreSalaUnir && nombreSalaUnir.trim() !== '') {
      socket.emit('cliente:unirSala', nombreSalaUnir);
    } else {
      alert('Por favor, ingrese un nombre válido para la sala.');
    }
  }
}

