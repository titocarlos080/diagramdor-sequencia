const { clientPsql } = require("./db_psql");


async function sd() {
    try {
        // Consulta SQL
        const sql = "SELECT * FROM users";
        // Conecta con la base de datos
        await clientPsql.connect();
        // Ejecuta la consulta SQL
        const result = await clientPsql.query(sql );
        const users = result.rows;
        // Imprime los usuarios
        console.log(users);
    } catch (error) {
        console.error('Error al ejecutar la consulta SQL:', error);
    } finally {
        // Cierra la conexión después de usarla
        await clientPsql.end();
    }
}
sd();



