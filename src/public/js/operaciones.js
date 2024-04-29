

async function agregarActor() {
    // Iniciar una transacción para agregar un nuevo nodo de bucle

    myDiagram.startTransaction("add node");
    var key = Math.random().toString(32).substring(8);;

    var newname = prompt("Actor") || "Actor";
    const newdata = {
        key: key,
        category: "Actor",
        text: newname,
        isGroup: true,
        loc: "90 0",
        duration: 13
    };
    // Finalizar la transacción
    myDiagram.model.addNodeData(newdata);
    myDiagram.commitTransaction("add node");
    //myDiagram.commitTransaction("addLoopNode");
    myDiagram.updateAllTargetBindings();

    await sendDataToServer(myDiagram.model.toJson());

}
async function agregarEntidad() {
    myDiagram.startTransaction("add node");
    var key = Math.random().toString(32).substring(8);;
    var newname = prompt("Entidad") || "Entidad";
    const newdata = {
        key: key,
        category: "Entidad",
        text: newname,
        isGroup: true,
        loc: "90 0",
        duration: 13
    };
    // Finalizar la transacción
    myDiagram.model.addNodeData(newdata);
    myDiagram.commitTransaction("add node");
    //myDiagram.commitTransaction("addLoopNode");
    myDiagram.updateAllTargetBindings();

    await sendDataToServer(myDiagram.model.toJson());
}
async function agregarControlador() {
    myDiagram.startTransaction("add node");
    var key = Math.random().toString(32).substring(8);;
    var newname = prompt("Controlador") || "Controlador";
    const newdata = {
        key: key,
        category: "Controlador",
        text: newname,
        isGroup: true,
        loc: "90 0",
        duration: 13
    };
    // Finalizar la transacción
    myDiagram.model.addNodeData(newdata);
    myDiagram.commitTransaction("add node");
    //myDiagram.commitTransaction("addLoopNode");
    myDiagram.updateAllTargetBindings();

    await sendDataToServer(myDiagram.model.toJson());
}
async function agregarInterface() {
    myDiagram.startTransaction("add node");
    var key = Math.random().toString(32).substring(8);;

    var newname = prompt("Interface") || "Interface";
    const newdata = {
        key: key,
        category: "Interface",
        text: newname,
        isGroup: true,
        loc: "90 0",
        duration: 13
    };
    // Finalizar la transacción
    myDiagram.model.addNodeData(newdata);
    myDiagram.commitTransaction("add node");
    //myDiagram.commitTransaction("addLoopNode");
    myDiagram.updateAllTargetBindings();

    await sendDataToServer(myDiagram.model.toJson());
}
async function agregarLoop() {
    myDiagram.startTransaction("add node");
    var key = Math.random().toString(32).substring(8);;
    var newdata = {
        key: key,
        category:"loop" ,
        loc: "80 0", 
        text: "loop", 
        ciclo: "es un ciclo", 
       
    };
    myDiagram.model.addNodeData(newdata); 
    myDiagram.commitTransaction("add node");
    //myDiagram.commitTransaction("addLoopNode");
    myDiagram.updateAllTargetBindings();

    await sendDataToServer(myDiagram.model.toJson());
}
async function agregarCondicional() {
    myDiagram.startTransaction("add node");
    var key = Math.random().toString(32).substring(8);;
    var newdata = {
        key: key,
        category:"if" ,
        loc: "80 0", 
        text: "if", 
       
    };
    myDiagram.model.addNodeData(newdata); 
    myDiagram.commitTransaction("add node");
    //myDiagram.commitTransaction("addLoopNode");
    myDiagram.updateAllTargetBindings();

    await sendDataToServer(myDiagram.model.toJson());
}
async function agregarCondicionalElse() {
    myDiagram.startTransaction("add node");
    var key = Math.random().toString(32).substring(8);;
    var newdata = {
        key: key,
        category:"else" ,
        loc: "80 0", 
        text: "else", 
       
    };
    myDiagram.model.addNodeData(newdata); 
    myDiagram.commitTransaction("add node");
    //myDiagram.commitTransaction("addLoopNode");
    myDiagram.updateAllTargetBindings();

    await sendDataToServer(myDiagram.model.toJson());
}

function abrirProyecto() {
    // Crea un nuevo elemento de entrada de archivo
    var fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = '.json';
    fileInput.style.display = 'none'; // Oculta el elemento de entrada de archivo

    // Agrega el elemento al documento
    document.body.appendChild(fileInput);

    fileInput.addEventListener('change', function (event) {
        var selectedFile = event.target.files[0]; // Obtiene el archivo seleccionado
        // Crea un nuevo lector de archivos
        var reader = new FileReader();
        // Define la función que se ejecutará cuando se complete la lectura del archivo
        reader.onload = function (event) {
            var contenido = event.target.result; // Contenido del archivo
            console.log(contenido); // Muestra el contenido del archivo en la consola
            myDiagram.model = go.Model.fromJson(contenido);

            // Aquí puedes hacer lo que necesites con el contenido del archivo
        };
        // Lee el contenido del archivo como texto
        reader.readAsText(selectedFile);
    });
    // Simula un clic en el elemento de entrada de archivo
    fileInput.click();
}

async function guardaProyecto() {
    const data = myDiagram.model.toJson();
    const nombreProyecto = prompt("Ingrese el nombre del proyecto:");

    try {
        // Guarda el proyecto en formato JSON en un archivo descargable
        const blob = new Blob([data], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${nombreProyecto}.json`;
        a.style.display = 'none';

        document.body.appendChild(a);
        a.click();

        URL.revokeObjectURL(url);
        document.body.removeChild(a);

        // Guarda el proyecto en MongoDB
        await guardarMongo(data, nombreProyecto);
        window.location.reload();

    } catch (error) {
        console.error('Error al guardar el proyecto:', error);
        alert('Error al guardar el proyecto.');
    }
}
async function crearProyecto() {
    console.log(myDiagram.model.toJson());
    if (myDiagram.model.nodeDataArray.length > 0 || myDiagram.model.linkDataArray.length > 0) {
        if (confirm("Por favor, guarde el proyecto antes de crear uno nuevo.")) {
            await guardaProyecto(); // Llama a la función para guardar el proyecto si el usuario confirma
        }
    } else {
        myDiagram.model = go.Model.fromJson({}); // Establece un nuevo modelo vacío
    }

}
function exportXML() {
    const data = generateXMI(myDiagram.model.toJson()) ;
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${nombreProyecto}.json`;
    a.style.display = 'none';

    document.body.appendChild(a);
    a.click();

    URL.revokeObjectURL(url);
    document.body.removeChild(a);

}

function generateXMI(  data) {
    const { nodeDataArray, linkDataArray } =JSON.parse(data) ;

    let xmi = `<?xml version="1.0" encoding="UTF-8"?>
    <xmi:XMI xmi:version="2.1" xmlns:uml="http://schema.omg.org/spec/UML/2.1" xmlns:xmi="http://schema.omg.org/spec/XMI/2.1" xmlns:thecustomprofile="http://www.sparxsystems.com/profiles/thecustomprofile/1.0">
    <xmi:Documentation exporter="Enterprise Architect" exporterVersion="6.5"/>
    `;

    // Agregar paquetes y colaboraciones
    xmi += `
        <packagedElement xmi:type="uml:Package" name="MainPackage">`;

    // Agregar colaboraciones y comportamientos
    nodeDataArray.forEach(node => {
        xmi += `
            <packagedElement xmi:type="uml:Collaboration" name="${node.text}">
                <ownedBehavior xmi:type="uml:Interaction" name="${node.text}_Interaction">`;

        // Agregar un lifeline para cada nodo
        xmi += `
                    <lifeline xmi:type="uml:Lifeline" name="${node.text}" represents="${node.key}"/>`;

        xmi += `
                </ownedBehavior>
            </packagedElement>`;
    });

    // Agregar mensajes entre lifelines
    linkDataArray.forEach(link => {
        xmi += `
            <message xmi:type="uml:Message" name="${link.text}" sendEvent="send_${link.from}" receiveEvent="recv_${link.to}"/>`;
    });

    xmi += `
        </packagedElement>
    </uml:Model>
</xmi:XMI>`;

    return xmi;
}

 
//---------------------------------------------------------------------------
//---------------------------------------------------------------------------
function importXML() {
      // Crea un nuevo elemento de entrada de archivo
      var fileInput = document.createElement('input');
      fileInput.type = 'file';
      fileInput.accept = '.XML';
      fileInput.style.display = 'none'; // Oculta el elemento de entrada de archivo
  
      // Agrega el elemento al documento
      document.body.appendChild(fileInput);
  
      fileInput.addEventListener('change', function (event) {
          var selectedFile = event.target.files[0]; // Obtiene el archivo seleccionado
          // Crea un nuevo lector de archivos
          var reader = new FileReader();
          // Define la función que se ejecutará cuando se complete la lectura del archivo
          reader.onload = function (event) {
              var contenido = event.target.result; // Contenido del archivo
              console.log(contenido); // Muestra el contenido del archivo en la consola
               myDiagram.model = go.Model.fromJson( parseXMI(contenido) );

              // Aquí puedes hacer lo que necesites con el contenido del archivo
          };
          // Lee el contenido del archivo como texto
          reader.readAsText(selectedFile);
      });
      // Simula un clic en el elemento de entrada de archivo
      fileInput.click();
}
//----------------------------------------------------------------------------
//----------------------------------------------------------------------------
function parseXMI(xmiString) {
    const model = {
        class: "GraphLinksModel",
        nodeDataArray: [],
        linkDataArray: []
    };

    // Extraer lifelines
    const lifelineRegex = /<lifeline xmi:type="uml:Lifeline" (.*?)\/>/g;
    let match;
    while ((match = lifelineRegex.exec(xmiString)) !== null) {
        const attributes = match[1];
        const idMatch = attributes.match(/xmi:id="(.*?)"/);
        const nameMatch = attributes.match(/name="(.*?)"/);
        if (idMatch && nameMatch) {
            model.nodeDataArray.push({
                key: idMatch[1],
                category: "Lifeline",
                text: nameMatch[1],
                isGroup: false,
                loc: "0 0"  // Default location
            });
        }
    }

    // Extraer mensajes
    const messageRegex = /<message (.*?)\/>/g;
    while ((match = messageRegex.exec(xmiString)) !== null) {
        const attributes = match[1];
        const nameMatch = attributes.match(/name="(.*?)"/);
        const sendEventMatch = attributes.match(/sendEvent="(.*?)"/);
        const receiveEventMatch = attributes.match(/receiveEvent="(.*?)"/);
        if (nameMatch && sendEventMatch && receiveEventMatch) {
            model.linkDataArray.push({
                from: sendEventMatch[1],
                to: receiveEventMatch[1],
                text: nameMatch[1]
            });
        }
    }

    return model;
}












//----------------------------------------------------------------------------
//----------------------------------------------------------------------------
async function exportJava() {
    var datas = myDiagram.model.toJson();
    socket.emit("cliente:generarJava", datas);
}





//-------------------------------------------------------------------------------
//-------------------------------------------------------------------------------
function exportC() {
    var datas = myDiagram.model.toJson();
    socket.emit("cliente:generarCPluss", datas);
}
//-------------------------------------------------------------------------------
//-------------------------------------------------------------------------------
function exportPhp() {
    var datas = myDiagram.model.toJson();
    socket.emit("cliente:generarPhp", datas);
}
//-------------------------------------------------------------------------------
//-------------------------------------------------------------------------------
function exportJavaScript() {
    var datas = myDiagram.model.toJson();
    socket.emit("cliente:generarJavaScript", datas);
}
//-------------------------------------------------------------------------------
//-------------------------------------------------------------------------------


async function guardarMongo(data, nombreProyecto) {
    const datas = {
        data: data,
        nombreProyecto: nombreProyecto
    }

    await fetch("/save_document", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(datas)
    }).then(response => {
        if (response.ok) {
            console.log("Documento guardado exitosamente");
        } else {
            console.error("Error al guardar el documento:", response.status);
        }
    }).catch(error => {
        console.error("Error al guardar el documento:", error);
    });

}


async function cargarData(proyectoId) {
    try {
        const response = await fetch(`/get_document/${proyectoId}`);

        // Check if the response is OK
        if (!response.ok) {
            throw new Error('La solicitud no fue exitosa');
        }

        // Parse response JSON
        const data = await response.json();

        console.log(data);
        // Here you can do something with the received data, like assigning it to your diagram
        myDiagram.model = go.Model.fromJson(data.data);

        console.log("llega");
    } catch (error) {
        console.error('Error al obtener los datos del documento:', error);
        // Alert the user or handle the error accordingly
        // For instance, you can throw the error if it's critical
        // throw error;
    }
}


