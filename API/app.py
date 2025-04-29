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
        cursor = conn.cursor()

        query = """
        SELECT *
        FROM utenti
        WHERE username = %s
        AND password = %s
        """

        cursor.execute(query)
        result = cursor.fetchall()

        return jsonify(result), 200

    except Error as e:
        return jsonify({'error': str(e)}), 500

    finally:
        if cursor:
            cursor.close()
        if conn:
            conn.close()


if __name__ == '__main__':
    app.run(debug=True)
