const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost:27017';
const dbName = 'nombre_de_tu_base_de_datos';
async function consultarColeccion(coleccion, filtro = {}) {
    let client; 
    try { 
        client = new MongoClient(url); 
        await client.connect(); 
        const db = client.db(dbName); 
        const collection = db.collection(coleccion); 
        const resultado = await collection.find(filtro).toArray(); 
        return resultado;
    } catch (error) {
        console.error('Error al realizar la consulta:', error);
        throw error;
    } finally { 
        if (client) {
            await client.close();
        }
    }

    
}

