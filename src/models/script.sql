 CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    user_name VARCHAR(50) NOT NULL,
    user_email VARCHAR(50) NOT NULL,
    user_pass VARCHAR(50) NOT NULL
);

CREATE TABLE projects (
    project_id SERIAL PRIMARY KEY,
    project_name VARCHAR(50) NOT NULL,
    user_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

CREATE TABLE invitations (
    invitation_id SERIAL PRIMARY KEY,
    useremisor_id INT NOT NULL,
	userreceptor_id INT NOT NULL,
    project_id INT NOT NULL,
    FOREIGN KEY (useremisor_id) REFERENCES users(user_id),
	FOREIGN KEY (userreceptor_id) REFERENCES users(user_id),
    FOREIGN KEY (project_id) REFERENCES projects(project_id)
);
CREATE TABLE salas (
    sala_id SERIAL PRIMARY KEY,
    sala_name VARCHAR(50) NOT NULL,
    user_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);







CREATE USER tito WITH PASSWORD '123';
GRANT ALL PRIVILEGES ON DATABASE diagrama TO tito;

GRANT CONNECT ON DATABASE diagrama TO tito;
GRANT USAGE ON SCHEMA public TO tito;
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO tito;










 -- Insertar usuarios
INSERT INTO users (user_name, user_email, user_pass) VALUES
    ('John Doe', 'john@example.com', 'password123'),
    ('Jane Smith', 'jane@example.com', 'securepass'),
    ('Alice Johnson', 'alice@example.com', 'strongpassword');

-- Insertar proyectos
INSERT INTO projects (project_name, user_id) VALUES
    ('Proyecto de Marketing', 1),
    ('Proyecto de Desarrollo Web', 2),
    ('Proyecto de Investigación', 3);

-- Insertar invitaciones
INSERT INTO invitations (useremisor_id, userreceptor_id, project_id) VALUES
    (1, 2, 1),  -- John Doe invita a Jane Smith al Proyecto de Marketing
    (2, 3, 2),  -- Jane Smith invita a Alice Johnson al Proyecto de Desarrollo Web
    (3, 1, 3);  -- Alice Johnson invita a John Doe al Proyecto de Investigación
