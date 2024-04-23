

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


function guardaProyecto() {
    const data = myDiagram.model.toJson();
    const blob = new Blob([data], { type: 'application/json' });

    // Crea un enlace de descarga
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'proyecto.json';
    a.style.display = 'none';

    // Agrega el enlace al cuerpo del documento y haz clic en él para iniciar la descarga
    document.body.appendChild(a);
    a.click();

    // Elimina el enlace después de la descarga
    URL.revokeObjectURL(url);
    document.body.removeChild(a);
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
const data=myDiagram.model.toJson()
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
