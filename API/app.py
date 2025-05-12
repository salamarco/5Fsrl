from flask import Flask, request, jsonify
import mysql.connector
from mysql.connector import Error
from contextlib import contextmanager

app = Flask(__name__)

db_config = {
    'host': 'localhost',
    'user': 'root',
    'password': '',
    'database': 'db_5f_srl'
}


# Context manager per gestione connessione/cursore
@contextmanager
def get_cursor(dictionary=False):
    conn = None
    cursor = None
    try:
        conn = mysql.connector.connect(**db_config)
        cursor = conn.cursor(dictionary=dictionary)
        yield cursor
        conn.commit()
    except Error as e:
        raise e
    finally:
        if cursor:
            cursor.close()
        if conn:
            conn.close()


# ENDPOINT /api/register
# metodo: POST
# metodo per la registrazione di un nuovo utente
# parametri: username, email, password, nome, cognome
# ritorno: [{'message'/'error' : 'dettagli'}, STATUS CODE]
@app.route('/api/register', methods=['POST'])
def userRegistration():
    data = request.json
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')
    ## Inserire la presa dei dati scolastici dell'utente: classe e indirizzo
    nome = data.get('nome')
    cognome = data.get('cognome')

    if not username or not password or not nome or not cognome:
        return jsonify({'error': 'Dati mancanti'}), 400

    try:
        with get_cursor() as cursor:
            cursor.execute("SELECT COUNT(*) FROM utenti WHERE email = %s", (email,))
            email_exists = cursor.fetchone()[0]

            if email_exists > 0:
                return jsonify({'error': 'L\'email è già registrata'}), 400

            insert_query = """
            INSERT INTO utenti (username, email, password, nome, cognome)
            VALUES (%s, %s, %s, %s, %s)
            """
            cursor.execute(insert_query, (username, email, password, nome, cognome))
            return jsonify({'message': 'Utente registrato con successo'}), 201
    except Error as e:
        return jsonify({'error': str(e)}), 500


# ENDPOINT /api/login
# metodo: POST
# metodo per il login di un utente
# parametri: username, password
# ritorno: [{'message'/'error' : 'dettagli'}, STATUS CODE]
@app.route('/api/login', methods=['POST'])
def userLogin():
    data = request.json
    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({'error': 'Dati mancanti'}), 400

    try:
        with get_cursor(dictionary=True) as cursor:
            query = """
            SELECT username, email, nome, cognome, password_hash
            FROM utenti
            WHERE username = %s
            """
            cursor.execute(query, (username,))
            result = cursor.fetchone()

            if result is None:
                return jsonify({'error': 'Utente non trovato'}), 404

            if result['password_hash'] == password:
                user_data = {
                    'username': result['username'],
                    'email': result['email'],
                    'nome': result['nome'],
                    'cognome': result['cognome']
                }
                return jsonify({'message': 'Login effettuato con successo', 'user': user_data}), 200
            else:
                return jsonify({'error': 'Credenziali errate'}), 401
    except Error as e:
        return jsonify({'error': str(e)}), 500


# ENDPOINT /api/schools
# metodo: GET
# metodo per ottenere l'intera lista delle scuole
# parametri: /
# ritorno: lista di oggetti con proprietà:
#                               -> id_scuola
#                               -> nome_scuola
#                               -> numero_anni
#                               -> indirizzi (a sua volta lista di oggetti con proprietà id_indirizzo e nome_indirizzo)
# esempio ritorno: [
#  {
#    "id_scuola": 1,
#    "nome_scuola": "Istituto Tecnico Industriale",
#    "numero_anni": 5,
#    "indirizzi": [
#      {
#        "id_indirizzo": 1,
#        "nome_indirizzo": "Informatica"
#      },
#      {
#        "id_indirizzo": 2,
#        "nome_indirizzo": "Elettronica"
#      }
#    ]
#  },
#  {
#    "id_scuola": 2,
#    "nome_scuola": "Liceo Scientifico",
#    "numero_anni": 5,
#    "indirizzi": [
#      {
#        "id_indirizzo": 3,
#        "nome_indirizzo": "Scienze Applicate"
#      }
#    ]
#  }
# ]
@app.route('/api/schools', methods=['GET'])
def getSchoolList():
    try:
        with get_cursor(dictionary=True) as cursor:
            query = """
                SELECT s.id_scuola, s.nome_scuola, s.numero_anni,
                       i.id_indirizzo, i.nome_indirizzo
                FROM Scuole s
                LEFT JOIN Indirizzi i
                ON s.id_scuola = i.id_scuola
                ORDER BY s.id_scuola;
            """
            cursor.execute(query)
            rows = cursor.fetchall()

            scuole_dict = {}
            for row in rows:
                id_scuola = row['id_scuola']
                if id_scuola not in scuole_dict:
                    scuole_dict[id_scuola] = {
                        'id_scuola': id_scuola,
                        'nome_scuola': row['nome_scuola'],
                        'numero_anni': row['numero_anni'],
                        'indirizzi': []
                    }
                if row['id_indirizzo']:
                    scuole_dict[id_scuola]['indirizzi'].append({
                        'id_indirizzo': row['id_indirizzo'],
                        'nome_indirizzo': row['nome_indirizzo']
                    })

            return jsonify(list(scuole_dict.values()))
    except Error as e:
        return jsonify({'error': str(e)}), 500


if __name__ == '__main__':
    app.run(debug=True)
