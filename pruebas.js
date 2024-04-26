var datas = {
    "class": "GraphLinksModel",
    "nodeDataArray": [
        { "key": "2gtv8", "category": "Actor", "text": "user", "isGroup": true, "loc": "0 0", "duration": 13 },
        { "key": "obo8", "category": "Interface", "text": "UIuser", "isGroup": true, "loc": "98 0", "duration": 13 },
        { "group": "obo8", "start": 2, "duration": 1, "key": -3 },
        { "key": "400no", "category": "Controlador", "text": "UserControllere", "isGroup": true, "loc": "210 0", "duration": 13 },
        { "group": "400no", "start": 4, "duration": 1, "key": -5 }
    ],
    "linkDataArray": [
        { "from": "2gtv8", "to": "obo8", "time": 2, "text": "index" },
        { "from": "obo8", "to": "400no", "time": 4, "text": "create" }
    ]
}
function generarJava(datas) {
    var codigo="//implentando codigo desde GoJS \n"
    var clases = {};
    var clasesKey = [];
    datas.nodeDataArray.forEach(data => {
        // Verificar si el objeto tiene las propiedades 'text' y 'key'
        if (data.hasOwnProperty('text') && data.hasOwnProperty('key')) {
            clases[data.key] = { name: data.text, methods: [] };
            clasesKey.push(data.key);
        }
    });

    datas.linkDataArray.forEach(link => {
        if (clases.hasOwnProperty(link.from) && clases.hasOwnProperty(link.to)) {
            const fromKey = link.from;
            const toKey = link.to;
            const methodName = link.text;
            clases[fromKey].methods.push({ target: toKey, name: methodName });
        }
    });

    // Generar las clases y métodos
    for (let key in clases) {
        const clase = clases[key];
       codigo+= generarClase(clase.name, clase.methods);
    }

return codigo;
}
function generarClase(claseName, methods) {
    let javaCode = `public class ${claseName} {\n`;
    methods.forEach(method => {
        javaCode += `  void ${method.name}() {\n`;
        javaCode += `    // Implementación del método ${method.name}\n`;
        javaCode += `  }\n`;
    });
    javaCode += `}\n`;

    return javaCode;
}

const codigo= generarJava(datas);
console.log(codigo);