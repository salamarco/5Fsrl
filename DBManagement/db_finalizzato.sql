CREATE DATABASE IF NOT EXISTS db_5f_srl;
USE db_5f_srl;

-- Classi
CREATE TABLE IF NOT EXISTS Classi(
    id_classe INT AUTO_INCREMENT,
    anno int NOT NULL,
    sezione VARCHAR(255),
    PRIMARY KEY(id_classe)
);

-- Utenti
CREATE TABLE IF NOT EXISTS Utenti (
    username VARCHAR(255) NOT NULL UNIQUE,
    email VARCHAR(255) UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    nome VARCHAR(255) NOT NULL,
    cognome VARCHAR(255) NOT NULL,
    id_classe INT,
    PRIMARY KEY (username),
    FOREIGN KEY(id_classe) REFERENCES Classi(id_classe) ON DELETE SET NULL
);

-- Scuole
CREATE TABLE IF NOT EXISTS Scuole(
    id_scuola INT AUTO_INCREMENT,
    nome_scuola VARCHAR(255) NOT NULL UNIQUE,
    numero_anni INT NOT NULL,
    PRIMARY KEY(id_scuola)
);

-- Indirizzi
CREATE TABLE IF NOT EXISTS Indirizzi(
    id_indirizzo INT AUTO_INCREMENT,
    nome_indirizzo VARCHAR(255) NOT NULL,
    id_scuola INT NOT NULL,
    PRIMARY KEY(id_indirizzo),
    FOREIGN KEY(id_scuola) REFERENCES Scuole(id_scuola) ON DELETE CASCADE
);

-- Materie
CREATE TABLE IF NOT EXISTS Materie(
    id_materia INT AUTO_INCREMENT,
    nome_materia VARCHAR(255) NOT NULL UNIQUE,
    PRIMARY KEY(id_materia)
);

-- Lista_materie_indirizzo
CREATE TABLE IF NOT EXISTS Lista_materie_indirizzo(
    id_materie_indirizzo INT AUTO_INCREMENT,
    id_indirizzo INT NOT NULL,
    id_materia INT NOT NULL,
    ore_settimanali INT NOT NULL,
    anno INT NOT NULL CHECK (anno BETWEEN 1 AND 5),
    PRIMARY KEY(id_materie_indirizzo),
    FOREIGN KEY(id_indirizzo) REFERENCES Indirizzi(id_indirizzo) ON DELETE CASCADE,
    FOREIGN KEY(id_materia) REFERENCES Materie(id_materia) ON DELETE CASCADE,
    UNIQUE KEY unique_materia_indirizzo_anno (id_indirizzo, id_materia, anno)
);

-- Lezioni
CREATE TABLE IF NOT EXISTS Lezioni(
    id_lezione INT AUTO_INCREMENT,
    data_inizio_lezione DATETIME NOT NULL,
    data_fine_lezione DATETIME NOT NULL,
    id_materia INT NOT NULL,
    id_classe INT NOT NULL,
    PRIMARY KEY(id_lezione),
    FOREIGN KEY(id_classe) REFERENCES Classi(id_classe) ON DELETE CASCADE,
    FOREIGN KEY(id_materia) REFERENCES Materie(id_materia) ON DELETE CASCADE);
    CONSTRAINT l_check_duration 
        CHECK (
            TIMESTAMPDIFF(MINUTE, data_inizio_lezione, data_fine_lezione) >= 50 AND
            TIMESTAMPDIFF(HOUR, data_inizio_lezione, data_fine_lezione) <= 7 AND
            DATE(data_inizio_lezione) = DATE(data_fine_lezione) AND
            data_fine_lezione > data_inizio_lezione
        )
);

-- Compiti
CREATE TABLE IF NOT EXISTS Compiti(
    id_compito INT AUTO_INCREMENT,
    titolo VARCHAR(255) NOT NULL,
    data_consegna DATETIME NOT NULL,
    id_materia INT NOT NULL,
    id_classe INT NOT NULL, 
    stato_compito ENUM('Da iniziare','In Corso','Completato') NOT NULL DEFAULT 'Da iniziare',
    priorita_compito ENUM('Alta','Media','Bassa') NOT NULL DEFAULT 'Media',
    descrizione TEXT,
    PRIMARY KEY(id_compito),
    FOREIGN KEY(id_materia) REFERENCES Materie(id_materia) ON DELETE CASCADE,
    FOREIGN KEY(id_classe) REFERENCES Classi(id_classe) ON DELETE CASCADE
);

-- Verifiche
CREATE TABLE IF NOT EXISTS Verifiche(
    id_verifica INT AUTO_INCREMENT,
    data_verifica DATETIME NOT NULL,
    id_classe INT NOT NULL,
    id_materia INT NOT NULL,
    tipologia_verifica ENUM('Scritta','Orale','Progetto') NOT NULL,
    descrizione TEXT,

    PRIMARY KEY(id_verifica),
    FOREIGN KEY(id_materia) REFERENCES Materie(id_materia),
    FOREIGN KEY(id_classe) REFERENCES Classi(id_classe)
);

-- Tipologie_personali
CREATE TABLE IF NOT EXISTS Tipologie_personali (
    id_tipologia INT AUTO_INCREMENT,
    username VARCHAR(255) NOT NULL,
    nome_tipologia VARCHAR(255) NOT NULL,
    colore_tipologia ENUM('#ab7050','#ed8d2d','#dec735','#19a850','#1e5eba','#e6443c','#b04a84','#7542a8') NOT NULL,
    PRIMARY KEY(id_tipologia),
    FOREIGN KEY(username) REFERENCES Utenti(username) ON DELETE CASCADE,
    UNIQUE KEY unique_tipologia_per_utente (username, nome_tipologia)
);

-- Eventi_Personali
CREATE TABLE IF NOT EXISTS Eventi_Personali(
    id_evento INT AUTO_INCREMENT,
    titolo VARCHAR(255) NOT NULL,
    username VARCHAR(255) NOT NULL,
    data_ora DATETIME NOT NULL,
    descrizione TEXT,
    id_tipologia INT NOT NULL,
    PRIMARY KEY(id_evento),
    FOREIGN KEY(username) REFERENCES Utenti(username) ON DELETE CASCADE,
    FOREIGN KEY(id_tipologia) REFERENCES Tipologie_personali(id_tipologia) ON DELETE CASCADE
);
