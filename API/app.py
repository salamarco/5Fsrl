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


# DA QUI IN POI TUTTO DA SISTEMARE (full generato ma almeno ho una base)

def get_current_user_email():
    ...


ALLOWED_COLORS_TIPOLOGIE = ...


def fetch_item_by_id(cursor, table_name, id_column_name, item_id, user_email):
    query = f"SELECT * FROM {table_name} WHERE {id_column_name} = %s AND id_utente = %s"
    cursor.execute(query, (item_id, user_email))
    return cursor.fetchone()

@app.route('/api/tasks', methods=['GET'])
def get_tasks():
    user_email = get_current_user_email()
    filters = []
    params = [user_email]
    
    query_base = "SELECT * FROM Compiti WHERE id_utente = %s"

    # Filtering (example: by stato_compito or priority_compito)
    allowed_filters = {"stato_compito": "stato_compito", "priority": "priority_compito"}
    for key, column_name in allowed_filters.items():
        if key in request.args:
            filters.append(f"{column_name} = %s")
            params.append(request.args[key])
    
    if filters:
        query_base += " AND " + " AND ".join(filters)

    # Ordering (example: orderBy=data_consegna&orderDir=DESC)
    order_by_column = request.args.get('orderBy')
    order_dir = request.args.get('orderDir', 'ASC').upper()
    
    allowed_order_columns = ['titolo', 'data_consegna', 'stato_compito', 'priority_compito']
    if order_by_column in allowed_order_columns and order_dir in ['ASC', 'DESC']:
        query_base += f" ORDER BY {order_by_column} {order_dir}"
    
    try:
        with get_cursor(dictionary=True) as cursor:
            cursor.execute(query_base, tuple(params))
            tasks = cursor.fetchall()
            return jsonify(tasks), 200
    except Error as e:
        return jsonify({"error": "Database error", "details": str(e)}), 500
    except ValueError as ve: # For authentication issues from get_current_user_email
        return jsonify({"error": str(ve)}), 401


@app.route('/api/tasks', methods=['POST'])
def add_task():
    user_email = get_current_user_email()
    data = request.get_json()

    if not data:
        return jsonify({"error": "Invalid JSON payload"}), 400

    required_fields = ['titolo', 'data_consegna', 'id_materia_compito', 'stato_compito', 'priority_compito']
    if not all(field in data for field in required_fields):
        return jsonify({"error": f"Missing fields. Required: {', '.join(required_fields)}"}), 400

    query = """
        INSERT INTO Compiti (titolo, data_consegna, id_materia_compito, id_utente, stato_compito, priority_compito)
        VALUES (%s, %s, %s, %s, %s, %s)
    """
    params = (
        data['titolo'], data['data_consegna'], data['id_materia_compito'],
        user_email, data['stato_compito'], data['priority_compito']
    )

    try:
        with get_cursor(dictionary=True) as cursor:
            cursor.execute(query, params)
            new_task_id = cursor.lastrowid
            # Fetch the newly created task to return it
            cursor.execute("SELECT * FROM Compiti WHERE id_compito = %s", (new_task_id,))
            new_task = cursor.fetchone()
            return jsonify(new_task), 201
    except Error as e:
        # Check for specific errors, e.g., foreign key violation for id_materia_compito
        if e.errno == 1452: # FK constraint fails
             return jsonify({"error": "Invalid id_materia_compito or user ID.", "details": str(e)}), 400
        return jsonify({"error": "Database error", "details": str(e)}), 500
    except ValueError as ve:
        return jsonify({"error": str(ve)}), 401


@app.route('/api/tasks/<int:task_id>', methods=['PUT'])
def update_task(task_id):
    user_email = get_current_user_email()
    data = request.get_json()

    if not data:
        return jsonify({"error": "Invalid JSON payload"}), 400

    # PUT requires all fields except keys for update
    required_fields = ['titolo', 'data_consegna', 'id_materia_compito', 'stato_compito', 'priority_compito']
    if not all(field in data for field in required_fields):
        return jsonify({"error": f"Missing fields for PUT. Required: {', '.join(required_fields)}"}), 400
    
    query = """
        UPDATE Compiti SET
            titolo = %s,
            data_consegna = %s,
            id_materia_compito = %s,
            stato_compito = %s,
            priority_compito = %s
        WHERE id_compito = %s AND id_utente = %s
    """
    params = (
        data['titolo'], data['data_consegna'], data['id_materia_compito'],
        data['stato_compito'], data['priority_compito'],
        task_id, user_email
    )

    try:
        with get_cursor(dictionary=True) as cursor:
            cursor.execute(query, params)
            if cursor.rowcount == 0:
                return jsonify({"error": "Task not found or user not authorized"}), 404
            
            # Fetch the updated task to return it
            updated_task = fetch_item_by_id(cursor, "Compiti", "id_compito", task_id, user_email)
            return jsonify(updated_task), 200
    except Error as e:
        if e.errno == 1452: # FK constraint fails
             return jsonify({"error": "Invalid id_materia_compito.", "details": str(e)}), 400
        return jsonify({"error": "Database error", "details": str(e)}), 500
    except ValueError as ve:
        return jsonify({"error": str(ve)}), 401


@app.route('/api/tasks/<int:task_id>', methods=['PATCH'])
def patch_task_status(task_id):
    user_email = get_current_user_email()
    data = request.get_json()

    if not data or 'stato_compito' not in data:
        return jsonify({"error": "Invalid JSON payload or missing 'stato_compito'"}), 400

    # Validate stato_compito enum value (optional, but good practice)
    allowed_statuses = ['Da iniziare', 'In Corso', 'Completato']
    if data['stato_compito'] not in allowed_statuses:
        return jsonify({"error": f"Invalid stato_compito. Allowed values: {', '.join(allowed_statuses)}"}), 400

    query = """
        UPDATE Compiti SET stato_compito = %s
        WHERE id_compito = %s AND id_utente = %s
    """
    params = (data['stato_compito'], task_id, user_email)

    try:
        with get_cursor(dictionary=True) as cursor:
            cursor.execute(query, params)
            if cursor.rowcount == 0:
                return jsonify({"error": "Task not found or user not authorized"}), 404
            
            updated_task = fetch_item_by_id(cursor, "Compiti", "id_compito", task_id, user_email)
            return jsonify(updated_task), 200
    except Error as e:
        return jsonify({"error": "Database error", "details": str(e)}), 500
    except ValueError as ve:
        return jsonify({"error": str(ve)}), 401


@app.route('/api/tasks/<int:task_id>', methods=['DELETE'])
def delete_task(task_id):
    user_email = get_current_user_email()
    query = "DELETE FROM Compiti WHERE id_compito = %s AND id_utente = %s"
    
    try:
        with get_cursor() as cursor: # No dictionary needed for delete
            cursor.execute(query, (task_id, user_email))
            if cursor.rowcount == 0:
                return jsonify({"error": "Task not found or user not authorized"}), 404
            return jsonify({"message": "Task deleted successfully"}), 200 # Or 204 No Content
    except Error as e:
        return jsonify({"error": "Database error", "details": str(e)}), 500
    except ValueError as ve:
        return jsonify({"error": str(ve)}), 401


# === LESSONS Endpoints (Lezioni Table) ===

@app.route('/api/lessons', methods=['GET'])
def get_lessons():
    user_email = get_current_user_email()
    # Add filtering/ordering similar to tasks if needed, e.g., by date or id_materia
    # For simplicity, this example fetches all lessons for the user.
    query = "SELECT * FROM Lezioni WHERE id_utente = %s ORDER BY data_inizio_lezione"
    try:
        with get_cursor(dictionary=True) as cursor:
            cursor.execute(query, (user_email,))
            lessons = cursor.fetchall()
            return jsonify(lessons), 200
    except Error as e:
        return jsonify({"error": "Database error", "details": str(e)}), 500
    except ValueError as ve:
        return jsonify({"error": str(ve)}), 401

@app.route('/api/lessons', methods=['POST'])
def add_lesson():
    user_email = get_current_user_email()
    data = request.get_json()

    if not data:
        return jsonify({"error": "Invalid JSON payload"}), 400

    required_fields = ['data_inizio_lezione', 'data_fine_lezione', 'id_materia']
    if not all(field in data for field in required_fields):
        return jsonify({"error": f"Missing fields. Required: {', '.join(required_fields)}"}), 400

    query = """
        INSERT INTO Lezioni (id_utente, data_inizio_lezione, data_fine_lezione, id_materia)
        VALUES (%s, %s, %s, %s)
    """
    params = (
        user_email, data['data_inizio_lezione'], data['data_fine_lezione'], data['id_materia']
    )

    try:
        with get_cursor(dictionary=True) as cursor:
            cursor.execute(query, params)
            new_lesson_id = cursor.lastrowid
            new_lesson = fetch_item_by_id(cursor, "Lezioni", "id_lezione", new_lesson_id, user_email)
            return jsonify(new_lesson), 201
    except Error as e:
        if e.errno == 1452: # FK constraint fails
             return jsonify({"error": "Invalid id_materia or user ID.", "details": str(e)}), 400
        if e.errno == 3819: # CHECK constraint fails (l_check_duration)
            return jsonify({"error": "Lesson duration constraint violated.", "details": str(e)}), 400
        return jsonify({"error": "Database error", "details": str(e)}), 500
    except ValueError as ve:
        return jsonify({"error": str(ve)}), 401


@app.route('/api/lessons/<int:lesson_id>', methods=['PUT'])
def update_lesson(lesson_id):
    user_email = get_current_user_email()
    data = request.get_json()

    if not data:
        return jsonify({"error": "Invalid JSON payload"}), 400

    required_fields = ['data_inizio_lezione', 'data_fine_lezione', 'id_materia']
    if not all(field in data for field in required_fields):
        return jsonify({"error": f"Missing fields for PUT. Required: {', '.join(required_fields)}"}), 400

    query = """
        UPDATE Lezioni SET
            data_inizio_lezione = %s,
            data_fine_lezione = %s,
            id_materia = %s
        WHERE id_lezione = %s AND id_utente = %s
    """
    params = (
        data['data_inizio_lezione'], data['data_fine_lezione'], data['id_materia'],
        lesson_id, user_email
    )

    try:
        with get_cursor(dictionary=True) as cursor:
            cursor.execute(query, params)
            if cursor.rowcount == 0:
                return jsonify({"error": "Lesson not found or user not authorized"}), 404
            
            updated_lesson = fetch_item_by_id(cursor, "Lezioni", "id_lezione", lesson_id, user_email)
            return jsonify(updated_lesson), 200
    except Error as e:
        if e.errno == 1452: # FK constraint fails
             return jsonify({"error": "Invalid id_materia.", "details": str(e)}), 400
        if e.errno == 3819: # CHECK constraint fails (l_check_duration)
            return jsonify({"error": "Lesson duration constraint violated.", "details": str(e)}), 400
        return jsonify({"error": "Database error", "details": str(e)}), 500
    except ValueError as ve:
        return jsonify({"error": str(ve)}), 401


@app.route('/api/lessons/<int:lesson_id>', methods=['DELETE'])
def delete_lesson(lesson_id):
    user_email = get_current_user_email()
    query = "DELETE FROM Lezioni WHERE id_lezione = %s AND id_utente = %s"
    
    try:
        with get_cursor() as cursor:
            cursor.execute(query, (lesson_id, user_email))
            if cursor.rowcount == 0:
                return jsonify({"error": "Lesson not found or user not authorized"}), 404
            return jsonify({"message": "Lesson deleted successfully"}), 200
    except Error as e:
        return jsonify({"error": "Database error", "details": str(e)}), 500
    except ValueError as ve:
        return jsonify({"error": str(ve)}), 401


# === PERSONAL EVENTS Endpoints (Attivita_personali Table) ===

@app.route('/api/events', methods=['GET'])
def get_events():
    user_email = get_current_user_email()
    # Add filtering/ordering if needed
    query = "SELECT * FROM Attivita_personali WHERE id_utente = %s ORDER BY data_inizio"
    try:
        with get_cursor(dictionary=True) as cursor:
            cursor.execute(query, (user_email,))
            events = cursor.fetchall()
            return jsonify(events), 200
    except Error as e:
        return jsonify({"error": "Database error", "details": str(e)}), 500
    except ValueError as ve:
        return jsonify({"error": str(ve)}), 401


@app.route('/api/events', methods=['POST'])
def add_event():
    user_email = get_current_user_email()
    data = request.get_json()

    if not data:
        return jsonify({"error": "Invalid JSON payload"}), 400

    required_fields = ['titolo', 'data_inizio', 'data_fine']
    if not all(field in data for field in required_fields):
        return jsonify({"error": f"Missing fields. Required: {', '.join(required_fields)}"}), 400

    # Optional fields
    descrizione = data.get('descrizione') # Defaults to None if not present
    tipologia_attivita = data.get('tipologia_attivita') # Defaults to None

    query = """
        INSERT INTO Attivita_personali (id_utente, titolo, data_inizio, data_fine, descrizione, tipologia_attivita)
        VALUES (%s, %s, %s, %s, %s, %s)
    """
    params = (
        user_email, data['titolo'], data['data_inizio'], data['data_fine'],
        descrizione, tipologia_attivita
    )

    try:
        with get_cursor(dictionary=True) as cursor:
            cursor.execute(query, params)
            new_event_id = cursor.lastrowid
            new_event = fetch_item_by_id(cursor, "Attivita_personali", "id_attivita_personale", new_event_id, user_email)
            return jsonify(new_event), 201
    except Error as e:
        if e.errno == 1452: # FK constraint fails (e.g. invalid tipologia_attivita)
             return jsonify({"error": "Invalid tipologia_attivita or user ID.", "details": str(e)}), 400
        if e.errno == 3819: # CHECK constraint fails (a_check_duration)
            return jsonify({"error": "Event duration constraint violated (end date must be after start date).", "details": str(e)}), 400
        return jsonify({"error": "Database error", "details": str(e)}), 500
    except ValueError as ve:
        return jsonify({"error": str(ve)}), 401


@app.route('/api/events/<int:event_id>', methods=['PUT'])
def update_event(event_id):
    user_email = get_current_user_email()
    data = request.get_json()

    if not data:
        return jsonify({"error": "Invalid JSON payload"}), 400

    required_fields = ['titolo', 'data_inizio', 'data_fine'] # descrizione and tipologia_attivita can be updated
    if not all(field in data for field in required_fields):
        return jsonify({"error": f"Missing fields for PUT. Required: {', '.join(required_fields)}"}), 400

    # Optional fields for PUT, if they are not provided, they should be set to their current value or NULL if allowed
    # For simplicity in this PUT, we'll update them if provided, or assume they are part of the 'all fields' requirement.
    # A more nuanced PUT might fetch the existing record and merge, or require all nullable fields to be explicitly sent.
    # Given "requires every field except keys", we assume all modifiable fields are sent.
    descrizione = data.get('descrizione')
    tipologia_attivita = data.get('tipologia_attivita')

    query = """
        UPDATE Attivita_personali SET
            titolo = %s,
            data_inizio = %s,
            data_fine = %s,
            descrizione = %s,
            tipologia_attivita = %s
        WHERE id_attivita_personale = %s AND id_utente = %s
    """
    params = (
        data['titolo'], data['data_inizio'], data['data_fine'],
        descrizione, tipologia_attivita,
        event_id, user_email
    )

    try:
        with get_cursor(dictionary=True) as cursor:
            cursor.execute(query, params)
            if cursor.rowcount == 0:
                return jsonify({"error": "Event not found or user not authorized"}), 404
            
            updated_event = fetch_item_by_id(cursor, "Attivita_personali", "id_attivita_personale", event_id, user_email)
            return jsonify(updated_event), 200
    except Error as e:
        if e.errno == 1452: # FK constraint fails
             return jsonify({"error": "Invalid tipologia_attivita.", "details": str(e)}), 400
        if e.errno == 3819: # CHECK constraint fails (a_check_duration)
            return jsonify({"error": "Event duration constraint violated (end date must be after start date).", "details": str(e)}), 400
        return jsonify({"error": "Database error", "details": str(e)}), 500
    except ValueError as ve:
        return jsonify({"error": str(ve)}), 401


@app.route('/api/events/<int:event_id>', methods=['DELETE'])
def delete_event(event_id):
    user_email = get_current_user_email()
    query = "DELETE FROM Attivita_personali WHERE id_attivita_personale = %s AND id_utente = %s"
    
    try:
        with get_cursor() as cursor:
            cursor.execute(query, (event_id, user_email))
            if cursor.rowcount == 0:
                return jsonify({"error": "Event not found or user not authorized"}), 404
            return jsonify({"message": "Event deleted successfully"}), 200
    except Error as e:
        return jsonify({"error": "Database error", "details": str(e)}), 500
    except ValueError as ve:
        return jsonify({"error": str(ve)}), 401
    

@app.route('/api/personal_activity_types', methods=['GET'])
def get_personal_activity_types():
    try:
        user_email = get_current_user_email()
        if not user_email: # Should be handled by get_current_user_email or a decorator
            return jsonify({"error": "Authentication required"}), 401

        query = "SELECT * FROM Tipologie_personali WHERE id_utente = %s ORDER BY nome_tipologia"
        with get_cursor(dictionary=True) as cursor:
            cursor.execute(query, (user_email,))
            types = cursor.fetchall()
            return jsonify(types), 200
    except ValueError as ve: # Custom error from get_current_user_email for auth issues
        return jsonify({"error": str(ve)}), 401
    except Error as e:
        app.logger.error(f"Database error fetching personal activity types: {e}")
        return jsonify({"error": "Database error", "details": str(e)}), 500

@app.route('/api/personal_activity_types', methods=['POST'])
def add_personal_activity_type():
    try:
        user_email = get_current_user_email()
        if not user_email:
            return jsonify({"error": "Authentication required"}), 401

        data = request.get_json()
        if not data:
            return jsonify({"error": "Invalid JSON payload"}), 400

        required_fields = ['nome_tipologia', 'colore_tipologia']
        if not all(field in data for field in required_fields):
            return jsonify({"error": f"Missing fields. Required: {', '.join(required_fields)}"}), 400

        nome_tipologia = data['nome_tipologia'].strip()
        colore_tipologia = data['colore_tipologia']

        if not nome_tipologia:
            return jsonify({"error": "nome_tipologia cannot be empty"}), 400
        
        if colore_tipologia not in ALLOWED_COLORS_TIPOLOGIE:
            return jsonify({"error": f"Invalid colore_tipologia. Allowed values: {', '.join(ALLOWED_COLORS_TIPOLOGIE)}"}), 400

        with get_cursor(dictionary=True) as cursor:
            # Check for global uniqueness of nome_tipologia due to FK from Attivita_personali
            # A UNIQUE constraint in the DB is highly recommended for nome_tipologia.
            cursor.execute("SELECT id_tipologia FROM Tipologie_personali WHERE nome_tipologia = %s", (nome_tipologia,))
            if cursor.fetchone():
                return jsonify({"error": f"A personal activity type with name '{nome_tipologia}' already exists globally."}), 409 # Conflict

            insert_query = """
                INSERT INTO Tipologie_personali (id_utente, nome_tipologia, colore_tipologia)
                VALUES (%s, %s, %s)
            """
            params = (user_email, nome_tipologia, colore_tipologia)
            
            cursor.execute(insert_query, params)
            new_type_id = cursor.lastrowid
            
            # Fetch the newly created type to return it
            new_type = fetch_item_by_id(cursor, "Tipologie_personali", "id_tipologia", new_type_id, user_email)
            if not new_type: # Should not happen if insert was successful and fetch_item_by_id is correct
                app.logger.error(f"Failed to fetch newly created personal activity type ID: {new_type_id}")
                return jsonify({"error": "Failed to retrieve created type"}), 500
                
            return jsonify(new_type), 201
            
    except ValueError as ve:
        return jsonify({"error": str(ve)}), 401
    except Error as e:
        # MySQL error code for duplicate entry for a unique key is 1062
        if e.errno == 1062:
            return jsonify({"error": f"A personal activity type with name '{data.get('nome_tipologia')}' already exists (DB constraint).", "details": str(e)}), 409
        # MySQL error code for foreign key constraint failure (e.g. id_utente does not exist) is 1452
        elif e.errno == 1452:
            return jsonify({"error": "Invalid user reference.", "details": str(e)}), 400
        app.logger.error(f"Database error adding personal activity type: {e}")
        return jsonify({"error": "Database error", "details": str(e)}), 500

@app.route('/api/personal_activity_types/<int:type_id>', methods=['PUT'])
def update_personal_activity_type(type_id):
    try:
        user_email = get_current_user_email()
        if not user_email:
            return jsonify({"error": "Authentication required"}), 401

        data = request.get_json()
        if not data:
            return jsonify({"error": "Invalid JSON payload"}), 400

        required_fields = ['nome_tipologia', 'colore_tipologia']
        if not all(field in data for field in required_fields):
            return jsonify({"error": f"Missing fields for PUT. Required: {', '.join(required_fields)}"}), 400

        nome_tipologia = data['nome_tipologia'].strip()
        colore_tipologia = data['colore_tipologia']

        if not nome_tipologia:
            return jsonify({"error": "nome_tipologia cannot be empty"}), 400

        if colore_tipologia not in ALLOWED_COLORS_TIPOLOGIE:
            return jsonify({"error": f"Invalid colore_tipologia. Allowed values: {', '.join(ALLOWED_COLORS_TIPOLOGIE)}"}), 400

        with get_cursor(dictionary=True) as cursor:
            # Check if the item exists and belongs to the user
            existing_type = fetch_item_by_id(cursor, "Tipologie_personali", "id_tipologia", type_id, user_email)
            if not existing_type:
                return jsonify({"error": "Personal activity type not found or user not authorized"}), 404

            # If nome_tipologia is being changed, check its global uniqueness (excluding the current item)
            if existing_type['nome_tipologia'] != nome_tipologia:
                cursor.execute(
                    "SELECT id_tipologia FROM Tipologie_personali WHERE nome_tipologia = %s AND id_tipologia != %s",
                    (nome_tipologia, type_id)
                )
                if cursor.fetchone():
                    return jsonify({"error": f"Another personal activity type with name '{nome_tipologia}' already exists globally."}), 409 # Conflict
            
            # ON UPDATE CASCADE on Attivita_personali.tipologia_attivita FK will handle updates to nome_tipologia.
            update_query = """
                UPDATE Tipologie_personali SET
                    nome_tipologia = %s,
                    colore_tipologia = %s
                WHERE id_tipologia = %s AND id_utente = %s 
            """
            params = (nome_tipologia, colore_tipologia, type_id, user_email)
            
            cursor.execute(update_query, params)
            
            if cursor.rowcount == 0 and (existing_type['nome_tipologia'] != nome_tipologia or existing_type['colore_tipologia'] != colore_tipologia) :
                # This condition means the WHERE clause (id_tipologia AND id_utente) matched,
                # but no actual data change occurred (or row disappeared).
                # If data was identical, rowcount can be 0 for some DB configs, or 1 if no change.
                # The fetch_item_by_id already confirmed it exists for user. If it fails here, it's odd.
                 app.logger.warning(f"Update for personal_activity_type {type_id} by user {user_email} resulted in 0 rowcount despite expected changes.")
                 # Re-fetch to confirm status
                 updated_type_check = fetch_item_by_id(cursor, "Tipologie_personali", "id_tipologia", type_id, user_email)
                 if not updated_type_check:
                     return jsonify({"error": "Personal activity type may have been deleted concurrently"}), 404

            updated_type = fetch_item_by_id(cursor, "Tipologie_personali", "id_tipologia", type_id, user_email)
            return jsonify(updated_type), 200
            
    except ValueError as ve:
        return jsonify({"error": str(ve)}), 401
    except Error as e:
        if e.errno == 1062: # Duplicate entry for unique key
            return jsonify({"error": f"Another personal activity type with name '{data.get('nome_tipologia')}' already exists (DB constraint).", "details": str(e)}), 409
        app.logger.error(f"Database error updating personal activity type {type_id}: {e}")
        return jsonify({"error": "Database error", "details": str(e)}), 500

@app.route('/api/personal_activity_types/<int:type_id>', methods=['DELETE'])
def delete_personal_activity_type(type_id):
    try:
        user_email = get_current_user_email()
        if not user_email:
            return jsonify({"error": "Authentication required"}), 401
        
        with get_cursor(dictionary=False) as cursor: # dictionary=True not strictly needed for delete if not fetching first
            # Optional: Verify the type exists and belongs to the user before deleting
            # This makes the error message more specific (404 vs potential 500 if id_utente FK had issues)
            # For this, we'd need dictionary=True and the fetch_item_by_id helper
            # For simplicity, relying on WHERE clause for now for ownership.
            # fetch_item_by_id(cursor, "Tipologie_personali", "id_tipologia", type_id, user_email) - if you want to check first

            # Deleting a Tipologie_personali will set Attivita_personali.tipologia_attivita to NULL
            # due to ON DELETE SET DEFAULT NULL on the FK.

            delete_query = "DELETE FROM Tipologie_personali WHERE id_tipologia = %s AND id_utente = %s"
            cursor.execute(delete_query, (type_id, user_email))

            if cursor.rowcount == 0:
                return jsonify({"error": "Personal activity type not found or user not authorized"}), 404
            
            return jsonify({"message": "Personal activity type deleted successfully"}), 200 # Or 204 No Content
            
    except ValueError as ve:
        return jsonify({"error": str(ve)}), 401
    except Error as e:
        # If there was an ON DELETE RESTRICT on a FK pointing to this table, error 1451 could occur.
        # But with ON DELETE SET DEFAULT NULL for Attivita_personali, this is less likely for that relationship.
        app.logger.error(f"Database error deleting personal activity type {type_id}: {e}")
        return jsonify({"error": "Database error", "details": str(e)}), 500


if __name__ == '__main__':
    app.run(debug=True)
