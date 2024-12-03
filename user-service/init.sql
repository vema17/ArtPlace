CREATE DATABASE IF NOT EXISTS user_service;
USE user_service;

CREATE TABLE IF NOT EXISTS usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    contrasena VARCHAR(255) NOT NULL,
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS perfil (
    id_perfil INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT NOT NULL,
    nombre_usuario VARCHAR (255) NOT NULL UNIQUE,
    biografia TEXT,
    foto_perfil VARCHAR(255),
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS direccion_de_usuario (
    id_calle INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT NOT NULL,
    calle VARCHAR(255),
    numero INT,
    ciudad VARCHAR(100),
    estado VARCHAR(100),
    codigo_postal INT,
    pais VARCHAR(100),
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS RRSS (
    URL_RRSS VARCHAR(255) PRIMARY KEY,
    id_usuario INT NOT NULL,
    Nombre_RRSS VARCHAR(100),
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS Contactos (
    Telefono VARCHAR(20) PRIMARY KEY,
    ID_usuario INT NOT NULL,
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id) ON DELETE CASCADE
);