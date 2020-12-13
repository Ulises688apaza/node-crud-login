
CREATE DATABASE database_links;

USE database_links;

-- USERS TABLE
CREATE TABLE users(
    id INT(11) NOT NULL,
    username VARCHAR(16) NOT NULL,
    fullname VARCHAR(100) NOT NULL
);

ALTER TABLE users
    ADD PRIMARY KEY (id);

ALTER TABLE users
    MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 2;

-- Agregar columna password al final, en el tutorial al principio me olvide de hacerlo
-- Nota: NO SÉ COMO SUBIRLA UN NIVEL MÁS PARA QUE NO QUEDE AL ÚLTIMO
ALTER TABLE users
    ADD password VARCHAR(60) NOT NULL;
-- -----------------------------------------------------------------------------------

DESCRIBE users;

-- lINKS TABLE
CREATE TABLE links(
    id INT(11) NOT NULL,
    title VARCHAR(150) NOT NULL,
    url VARCHAR(255) NOT NULL,
    description TEXT,
    user_id INT(11),
    created_at timestamp NOT NULL DEFAULT current_timestamp,
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(id)
);

ALTER TABLE links
    ADD PRIMARY KEY (id);

ALTER TABLE links
    MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 2;
-- -----------------------------------------------------------------------------------