from flask import Flask, request, jsonify
import mysql.connector
from mysql.connector import Error

app = Flask(__name__)

db_config = {
    'host': 'localhost',
    'user': 'root',
    'password': '',
    'database': 'db_5f_srl'
}


def get_db_connection():
    return mysql.connector.connect(**db_config)


@app.route('/api/register', methods = ['POST'])
def userRegistration():

    data = request.json
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')
    nome = data.get('nome')
    cognome = data.get('cognome')

    if not username or not password or not nome or not cognome:
        return jsonify({'error': 'Dati mancanti'}), 400

    try:
        conn = get_db_connection()
        cursor = conn.cursor()

        cursor.execute("SELECT COUNT(*) FROM utenti WHERE email = %s", (email))
        email_exists = cursor.fetchone()[0]

        if email_exists > 0:
            return jsonify({'error': 'L\'email è già registrata'}), 400

        insert_query = """
        INSERT INTO utenti (username, email, password, nome, cognome)
        VALUES (%s, %s, %s, %s, %s)
        """
        cursor.execute(insert_query, (username, email, password, nome, cognome))
        conn.commit()

        return jsonify({'message': 'Utente registrato con successo'}), 201

    except Error as e:
        return jsonify({'error': str(e)}), 500

    finally:
        if cursor:
            cursor.close()
        if conn:
            conn.close()


@app.route('/api/login', methods = ['POST'])
def userLogin():

    data = request.json
    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({'error': 'Dati mancanti'}), 400

    try:
        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)

        query = """
        SELECT username, email, nome, cognome, password_hash
        FROM utenti
        WHERE username = %s
        """

        cursor.execute(query, (username))
        result = cursor.fetchone()

        if result is None:
            return jsonify({'error': 'Utente non trovato'}), 404

        stored_password = result['password_hash']
        if stored_password == password:
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

    finally:
        if cursor:
            cursor.close()
        if conn:
            conn.close()


@app.route('/api/schools', methods = ['GET'])
def getSchoolList():
    
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)

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

    cursor.close()
    conn.close()
    return jsonify(list(scuole_dict.values()))


if __name__ == '__main__':
    app.run(debug=True)
