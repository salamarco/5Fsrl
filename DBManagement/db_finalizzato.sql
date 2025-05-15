CREATE DATABASE IF NOT EXISTS db_5f_srl;

USE db_5f_srl;

CREATE TABLE IF NOT EXISTS Materie(
    id_materia INT AUTO_INCREMENT,
    nome_materia VARCHAR(255) UNIQUE NOT NULL,
    
    PRIMARY KEY(id_materia)
);

CREATE TABLE IF NOT EXISTS Scuole(
    id_scuola INT AUTO_INCREMENT,
    nome_scuola VARCHAR() NOT NULL UNIQUE,
    n_scuola INT NOT NULL,
    
    PRIMARY KEY(id_scuola)
);

CREATE TABLE IF NOT EXISTS Indirizzi(
    id_indirizzo INT AUTO_INCREMENT,
    nome_indirizzo VARCHAR(255) NOT NULL,
    id_scuola INT NOT NULL,
    anno_indirizzo INT NOT NULL,
    
    PRIMARY KEY(id_indirizzo),
    FOREIGN KEY(id_scuola) REFERENCES Scuole(id_scuola) ON UPDATE CASCADE ON DELETE RESTRICT
);

CREATE TABLE IF NOT EXISTS Utenti(
    email VARCHAR(255),
    username VARCHAR(255),
    password_hash VARCHAR(255) NOT NULL,
    id_indirizzo INT NOT NULL,
    anno_scuola INT NOT NULL,

    PRIMARY KEY(email),
    FOREIGN KEY(id_indirizzo) REFERENCES Indirizzi(id_indirizzo) ON UPDATE CASCADE ON DELETE SET DEFAULT NULL,
    FOREIGN KEY(anno_scuola) REFERENCES Indirizzi(anno_indirizzo) ON UPDATE CASCADE ON DELETE SET DEFAULT NULL

)

CREATE TABLE IF NOT EXISTS Lista_materie_indirizzo(
    id_materie_indirizzo INT AUTO_INCREMENT,
    id_indirizzo INT,
    nome_materia VARCHAR(255) NOT NULL,
    ore_settimanali INT NOT NULL,
    
    PRIMARY KEY(id_materie_indirizzo),
    FOREIGN KEY(nome_materia) REFERENCES Materie(nome_materia) ON UPDATE CASCADE ON DELETE RESTRICT
);

CREATE TABLE IF NOT EXISTS Lezioni(
    id_lezione INT AUTO_INCREMENT,
    id_utente VARCHAR(255) NOT NULL,
    data_inizio_lezione DATETIME NOT NULL,
    data_fine_lezione DATETIME NOT NULL,
    id_materia INT NOT NULL,
    
    PRIMARY KEY(id_lezione),
    FOREIGN KEY(id_materia) REFERENCES Lista_materie_indirizzo(id_materie_indirizzo) ON UPDATE CASCADE ON DELETE SET DEFAULT NULL,
    FOREIGN KEY(id_utente) REFERENCES Utenti(email) ON UPDATE CASCADE ON DELETE RESTRICT,

    CONSTRAINT l_check_duration 
        CHECK (
            TIMESTAMPDIFF(MINUTE, data_inizio_lezione, data_fine_lezione) >= 50 AND
            TIMESTAMPDIFF(HOUR, data_inizio_lezione, data_fine_lezione) <= 7 AND
            DATE(data_inizio_lezione) = DATE(data_fine_lezione) AND
            data_fine_lezione > data_inizio_lezione
        )
);

CREATE TABLE IF NOT EXISTS Verifiche(
    id_verifica INT AUTO_INCREMENT,
    data_verifica DATETIME NOT NULL,
    id_utente VARCHAR(255) NOT NULL,
    id_materia INT NOT NULL,
    tipologia_verifica ENUM('Scritta','Orale','Progetto') NOT NULL,
    descrizione TEXT,

    PRIMARY KEY(id_verifica),
    FOREIGN KEY(id_materia) REFERENCES Lista_materie_indirizzo(id_materie_indirizzo) ON UPDATE CASCADE ON DELETE SET DEFAULT NULL,
    FOREIGN KEY(id_utente) REFERENCES Utenti(email) ON UPDATE CASCADE ON DELETE RESTRICT
);

CREATE TABLE IF NOT EXISTS Compiti(
    id_compito INT AUTO_INCREMENT,
    titolo VARCHAR(255) NOT NULL,
    data_consegna DATETIME NOT NULL,
    id_materia INT NOT NULL,
    id_utente VARCHAR(255) NOT NULL,
    stato_compito ENUM('Da iniziare','In Corso','Completato') NOT NULL,
    priority_compito ENUM('Alta','Media','Bassa')  NOT NULL,
    
    PRIMARY KEY(id_compito),
    FOREIGN KEY(id_materia_compito) REFERENCES Lista_materie_indirizzo(id_materie_indirizzo) ON UPDATE CASCADE ON DELETE SET DEFAULT NULL,
    FOREIGN KEY(id_utente) REFERENCES Utenti(email) ON UPDATE CASCADE ON DELETE RESTRICT
);

CREATE TABLE IF NOT EXISTS Tipologie_personali(
    id_tipologia INT AUTO_INCREMENT,
    id_utente VARCHAR(255) NOT NULL,
    nome_tipologia VARCHAR(255) NOT NULL,
    colore_tipologia ENUM('#ab7050','#ed8d2d','#dec735','#19a850','#1e5eba','#e6443c','#b04a84','#7542a8') NOT NULL,

    PRIMARY KEY(id_tipologia),
    FOREIGN KEY(id_utente) REFERENCES Utenti(email) ON UPDATE CASCADE ON DELETE RESTRICT
);
    
CREATE TABLE IF NOT EXISTS Attivita_personali(
    id_attivita_personale INT AUTO_INCREMENT,
    titolo VARCHAR(255) NOT NULL,
    id_utente VARCHAR(255) NOT NULL,
    data_inizio DATETIME NOT NULL,
    data_fine DATETIME NOT NULL,
    descrizione TEXT,
    tipologia_attivita VARCHAR(255),
    CONSTRAINT a_check_duration 
        CHECK (
            DATE(data_fine) > DATE(data_inizio)
        ),
    
    PRIMARY KEY(id_attivita_personale),
    FOREIGN KEY(id_utente) REFERENCES Utenti(email) ON UPDATE CASCADE ON DELETE RESTRICT,
    FOREIGN KEY(tipologia_attivita) REFERENCES Tipologie_personali(nome_tipologia) ON UPDATE CASCADE ON DELETE SET DEFAULT NULL
);

-- COMANDI DI INSERIMENTO DATI VANNO INSERITI IN UN ALTRO FILE
INSERT INTO Scuole(nome_scuola),
VALUES('Liceo');

INSERT INTO Scuole(nome_scuola),
VALUES('Istituo tecnico');

INSERT INTO Scuole(nome_scuola),
VALUES('Professionale');

INSERT INTO Scuole(nome_scuola),
VALUES('ieFP triennale');

INSERT INTO Scuole(nome_scuola),
VALUES('ieFP quadriennale');

INSERT INTO Scuole(nome_scuola),
VALUES('Scuole medie');
