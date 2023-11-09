CREATE DATABASE locadora;

USE locadora;

CREATE TABLE carro (
    ID INT UNSIGNED AUTO_INCREMENT NOT NULL,
    modelo VARCHAR(100) NOT NULL,
    marca VARCHAR(100) NOT NULL,
    preco_aluguel DECIMAL(10, 2) NOT NULL,
    descricao TEXT,
    categoria VARCHAR(100),
    PRIMARY KEY (ID)
);

CREATE TABLE aluguel (
    ID INT UNSIGNED AUTO_INCREMENT NOT NULL,
    carro_id INT UNSIGNED NOT NULL,
    data_inicio DATETIME NOT NULL,
    data_fim DATETIME NOT NULL,
    PRIMARY KEY (ID),
    FOREIGN KEY (carro_id) REFERENCES carro (ID)
);