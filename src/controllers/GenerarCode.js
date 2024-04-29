
function generarClaseJava(claseName, methods) {
    let javaCode = `public class ${claseName} {\n`;
    methods.forEach(method => {
        javaCode += `  void ${method.name}() {\n`;
        javaCode += `    // Implementación del método ${method.name}\n`;
        javaCode += `  }\n`;
    });
    javaCode += `}\n`;

    return javaCode;
}

function generarClaseJavaScript(claseName, methods) {
    let javaCode = ` class ${claseName} {\n`;
    methods.forEach(method => {
        javaCode += `  void ${method.name}() {\n`;
        javaCode += `    // Implementación del método ${method.name}\n`;
        javaCode += `  }\n`;
    });
    javaCode += `}\n`;

    return javaCode;
}

function generarClaseCpluss(claseName, methods) {
    let javaCode = ` class ${claseName} {\n`;
    methods.forEach(method => {
        javaCode += `  void ${method.name}() {\n`;
        javaCode += `    // Implementación del método ${method.name}\n`;
        javaCode += `  }\n`;
    });
    javaCode += `}\n`;

    return javaCode;
}
function generarClasePhp(claseName, methods) {
    let javaCode = ` class ${claseName} {\n`;
    methods.forEach(method => {
        javaCode += `  void ${method.name}() {\n`;
        javaCode += `    // Implementación del método ${method.name}\n`;
        javaCode += `  }\n`;
    });
    javaCode += `}\n`;

    return javaCode;
}

const GeneradorCode = {
    java: (datas) => {
        var codigo = "//implentando codigo desde GoJS para Java \n"
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
                clases[toKey].methods.push({ target: toKey, name: methodName });
            }
        });

        // Generar las clases y métodos
        for (let key in clases) {
            const clase = clases[key];
            codigo += generarClaseJava(clase.name, clase.methods);
        }

        return codigo;

    },

    cpluss: (datas) => {
        var codigo = "//implentando codigo desde GoJS para C++\n "
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
                clases[toKey].methods.push({ target: toKey, name: methodName });
            }
        });

        // Generar las clases y métodos
        for (let key in clases) {
            const clase = clases[key];
            codigo += generarClaseCpluss(clase.name, clase.methods);
        }

        return codigo;

    },

    javascript: (datas) => {
        var codigo = "//implentando codigo desde GoJS para JavaScript\n"
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
                clases[toKey].methods.push({ target: toKey, name: methodName });
            }
        });

        // Generar las clases y métodos
        for (let key in clases) {
            const clase = clases[key];
            codigo += generarClaseJavaScript(clase.name, clase.methods);
        }

        return codigo;

    },
    php:(datas)=>{
        var codigo = "//implentando codigo desde GoJS para PHP\n"
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
                clases[toKey].methods.push({ target: toKey, name: methodName });
            }
        });

        // Generar las clases y métodos
        for (let key in clases) {
            const clase = clases[key];
            codigo += generarClasePhp(clase.name, clase.methods);
        }

        return codigo;
    }
}

module.exports = { GeneradorCode }