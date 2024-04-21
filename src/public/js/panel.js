let socket = io();

socket.on('respuesta', (data) => {
alert(data.msg);   
  });

  var sistemaOperativo = navigator.platform;
  console.log("Sistema Operativo: " + sistemaOperativo);
  socket.emit("connectado",{data:sistemaOperativo})
//d3a6-0ef3-81f0-56a5
 