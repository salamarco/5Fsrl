USE db_5f_srl;

-- Inserimento scuole
INSERT INTO Scuole (nome_scuola, numero_anni) VALUES
('Istituto Tecnico Industriale', 5),
('Liceo Scientifico', 5);

-- Inserimento indirizzi
INSERT INTO Indirizzi (nome_indirizzo, id_scuola) VALUES
('Informatica', 1),
('Elettronica', 1),
('Scientifico opzione Scienze Applicate', 2);

-- Inserimento classi
INSERT INTO Classi (anno, sezione) VALUES
(5, 'A'),
(4, 'B');

-- Inserimento materie
INSERT INTO Materie (nome_materia) VALUES
('Italiano'),
('Matematica'),
('Informatica'),
('Sistemi e Reti');

-- Lista materie per indirizzo
INSERT INTO Lista_materie_indirizzo (id_indirizzo, id_materia, ore_settimanali, anno) VALUES
(1, 1, 4, 5), -- Italiano per Informatica 5°
(1, 2, 4, 5), -- Matematica
(1, 3, 6, 5), -- Informatica
(1, 4, 4, 5); -- Sistemi e Reti

-- Inserimento utenti
INSERT INTO Utenti (username, email, password_hash, nome, cognome, id_classe) VALUES
('mrossi', 'mario.rossi@example.com', 'hash123', 'Mario', 'Rossi', 1),
('lgialli', 'luisa.gialli@example.com', 'hash456', 'Luisa', 'Gialli', 2);

-- Lezioni
INSERT INTO Lezioni (data_inizio_lezione, data_fine_lezione, id_materia, id_classe) VALUES
('2025-04-29 08:00:00', '2025-04-29 09:00:00', 3, 1),
('2025-04-30 10:00:00', '2025-04-30 11:00:00', 4, 1);

-- Compiti
INSERT INTO Compiti (titolo, data_consegna, id_materia, id_classe, stato_compito, priorita_compito, descrizione) VALUES
('Relazione progetto PHP', '2025-05-02 23:59:00', 3, 1, 'In Corso', 'Alta', 'Sviluppare e documentare il progetto PHP.'),
('Esercizi Sistemi', '2025-05-03 23:59:00', 4, 1, 'Da iniziare', 'Media', 'Svolgere esercizi sui protocolli di rete.');

-- Verifiche
INSERT INTO Verifiche (data_verifica, id_classe, id_materia, tipologia_verifica, descrizione) VALUES
('2025-05-06 09:00:00', 1, 2, 'Scritta', 'Verifica su equazioni e disequazioni.'),
('2025-05-08 11:00:00', 1, 3, 'Progetto', 'Presentazione progetto finale di informatica.');

-- Tipologie personali
INSERT INTO Tipologie_personali (username, nome_tipologia, colore_tipologia) VALUES
('mrossi', 'Studio', '#1e5eba'),
('mrossi', 'Sport', '#19a850'),
('lgialli', 'Lavoro', '#ed8d2d');

-- Eventi personali
INSERT INTO Eventi_Personali (titolo, username, data_ora, descrizione, id_tipologia) VALUES
('Ripasso Sistemi', 'mrossi', '2025-05-01 15:00:00', 'Studiare i protocolli TCP/IP', 1),
('Allenamento Basket', 'mrossi', '2025-05-01 18:00:00', 'Partita con amici al parco', 2),
('Tutoraggio', 'lgialli', '2025-05-02 10:00:00', 'Aiuto compagni in matematica', 3);
