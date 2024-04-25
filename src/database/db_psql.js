
const { Client } = require('pg');

// Configura la conexión con la base de datos
const clientPsql = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'diagrama',
    password: '123',
    port: 5432, // El puerto predeterminado de PostgreSQL es 5432
});
clientPsql.connect()
  .then(() => console.log('Conexión exitosa a la base de datos'))
  .catch(err => console.error('Error al conectar a la base de datos:', err));

module.exports={clientPsql}
 