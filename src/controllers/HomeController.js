const { clientPsql } = require("../models/db_psql");

const HomeController = {
    index: (req, res) => {
        res.render("index", { title: "Diagramador de secuencia" });
    },

    login: async (req, res) => {
        const { user_email, user_pass } = req.body;
        console.log(user_email, ":", user_pass);
        try {
           
           
            const sql = 'SELECT * FROM users WHERE user_email = $1 AND user_pass = $2';
            const result = await clientPsql.query(sql, [user_email, user_pass]);
            
            if (result.rows.length > 0) {
                const user = result.rows[0];
                console.log(user);
                req.session.user = user;
                req.session.userId = user.user_id;
                res.redirect(`/panel/project/${user.user_id}`);
            } else {
                res.send('Credenciales incorrectas');
            }

        } catch (error) {
            console.error('Error al iniciar sesión:', error);
            res.status(500).send('Error en el servidor');
        }
    },

    logout: (req, res) => {
        req.session.destroy((err) => {

            if (err) {
                console.error('Error al cerrar sesión:', err);
                res.status(500).send('Error en el servidor');
            } else {
                console.log("se cerro session correctamente.", req.session);
                res.redirect('/');
            }
        });
    }
}

module.exports = { HomeController }