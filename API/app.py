from flask import Flask, request, jsonify
import mysql.connector
from mysql.connector import Error
from contextlib import contextmanager
import bcrypt

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


def email_exists(email):
    try:
        with get_cursor() as cursor:
            query = """
                    SELECT COUNT(*)
                    FROM utenti
                    WHERE email = %s
            """
            cursor.execute(query, (email))
            exists = cursor.fetchone()[0]

            return exists > 0

    except Error as e:
        return True
    

def username_exists(username):
    try:
        with get_cursor() as cursor:
            query = """
                    SELECT COUNT(*)
                    FROM utenti
                    WHERE username = %s
            """
            cursor.execute(query, (username))
            exists = cursor.fetchone()[0]

            return exists > 0

    except Error as e:
        return True


# ENDPOINT /api/register
# metodo: POST
# TO DO: suddividere in più endpoint (prima informazioni essenziali e poi scolastiche)
# metodo per la registrazione di un nuovo utente
# parametri: username, email, password, id classe nome, cognome
# ritorno: [{'message'/'error' : 'dettagli'}, STATUS CODE]
@app.route('/api/register', methods=['POST'])
def userRegistration():
    data = request.json
    username = data.get('username')
    email = data.get('email')

    password = data.get('password').encode('UTF-8')
    salt = bcrypt.gensalt()
    password_hash = bcrypt.hashpw(password, salt)

    id_classe = data.get('id_classe')
    # da inserire id indirizzo (non ancora presente su DB)
    nome = data.get('nome')
    cognome = data.get('cognome')

    if not username or not password or not nome or not cognome:
        return jsonify({'error': 'Dati mancanti'}), 400
    
    if email_exists(email):
        return jsonify({'error': 'L\'email è già registrata'}), 400

    if username_exists(username):
        return jsonify({'error': 'Username già registrato'}), 400

    try:
        with get_cursor() as cursor:
            insert_query = """
            INSERT INTO utenti (username, email, password, id_classe nome, cognome)
            VALUES (%s, %s, %s, %s, %s, %s)
            """
            cursor.execute(insert_query, (username, email, password, id_classe, nome, cognome))
            return jsonify({'message': 'Utente registrato con successo'}), 201
    except Error as e:
        return jsonify({'error': str(e)}), 500


# ENDPOINT /api/login
# metodo: POST
# metodo per il login di un utente
# parametri: username, password
# ritorno: in caso di errori [{'error' : 'dettagli'}, STATUS CODE]
# in caso di login corretto [
#                               {
#                                   'message' : 'dettagli',
#                                   'user' : {            
#                                       'username': 'bo',
#                                       'email': 'email@gmail.com',
#                                       'nome': 'gigi',
#                                       'cognome': 'gigi',
#                                       'id_classe': 1
#                                       <da aggiungere indirizzo>
#                                    }
#                               },
#                               STATUS CODE
#                            ]
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
            SELECT *
            FROM utenti
            WHERE username = %s
            """
            cursor.execute(query, (username,))
            result = cursor.fetchone()

            if result is None:
                return jsonify({'error': 'Utente non trovato'}), 404

            if bcrypt.checkpw(password.encode('UTF-8'), result['password_hash']):
                user_data = {
                    'username': result['username'],
                    'email': result['email'],
                    'nome': result['nome'],
                    'cognome': result['cognome'],
                    'id_classe': result['id_classe']
                    # da aggiungere indirizzo (non ancora salvato nel DB)
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
