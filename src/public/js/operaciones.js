

async function agregarActor() {
    // Iniciar una transacción para agregar un nuevo nodo de bucle

    myDiagram.startTransaction("add node");
    var key = 85;

    var newname = "new:" + key.toString();
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
    var key = 85;

    var newname = "new:" + key.toString();
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
    var key = 85;

    var newname = "new:" + key.toString();
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
    var key = 85;

    var newname = "new:" + key.toString();
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
    const data = myDiagram.model.toJson()
}
function exportJava() {
    const data = myDiagram.model.toJson();
    const model = JSON.parse(data);
    const nodeDataArray = model.nodeDataArray;
    const linkDataArray = model.linkDataArray;

    // Objeto para almacenar las relaciones entre nodos
    const relationships = {};

    // Itera sobre los nodos para obtener los nombres de las clases
    const classNames = nodeDataArray.map(node => {
        if (node.text) {
            return node.text.split(":")[0].trim();
        } else {
            return ''; // O cualquier valor predeterminado que desees en caso de que node.text sea undefined
        }
    });

    // Crea la clase Java
    let javaCode = "public class MyClass {\n";

    // Crea instancias y métodos basados en los enlaces entre los nodos
    linkDataArray.forEach(link => {
        const fromNode = nodeDataArray.find(node => node.key === link.from);
        const toNode = nodeDataArray.find(node => node.key === link.to);

        const fromClassName = fromNode.text.split(":")[0].trim();
        const toClassName = toNode.text.split(":")[0].trim();

        // Registra las relaciones entre clases
        if (!relationships[fromClassName]) {
            relationships[fromClassName] = [];
        }
        relationships[fromClassName].push(toClassName);

        // Crea el método para la relación entre nodos
        const methodName = `call${toClassName}`;
        javaCode += `    public void ${methodName}() {\n`;
        javaCode += `        ${toClassName} ${toClassName.toLowerCase()} = new ${toClassName}();\n`;
        javaCode += `        ${toClassName.toLowerCase()}.${methodName}();\n`;
        javaCode += `    }\n`;
    });

    // Crea instancias de clases sin relaciones entrantes
    classNames.forEach(className => {
        if (!relationships[className]) {
            javaCode += `    ${className} ${className.toLowerCase()} = new ${className}();\n`;
        }
    });

    javaCode += "}\n";

    console.log(javaCode);
}

function exportC() {

}

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