import pandas as pd
import psycopg2
from psycopg2 import OperationalError


def create_conn():
    conn = None
    try:
        conn = psycopg2.connect(
            user="postgres",
            password="472372239",
            host="localhost",
            port="5432",
            database="users"
        )
    except OperationalError as e:
        print(f"Error connecting to database: {e}")
    return conn


def create_table(conn):
    create_table = """
    CREATE TABLE IF NOT EXISTS aufgaben (
        id SERIAL PRIMARY KEY,
        aufgabenstellung VARCHAR NOT NULL,
        musterloesung VARCHAR NOT NULL,
        kategorie VARCHAR,
        schwerigkeit FLOAT,
        discrimination FLOAT
    );
    """
    try:
        cur = conn.cursor()
        cur.execute(create_table)
        cur.close()
        conn.commit()
        print("Table created successfully:)")
    except Exception as e:
        print(f"Error creating table: {e}")
        conn.rollback()


def insert_rows(conn, df):
    sql_insert_row = "INSERT INTO aufgaben (id, aufgabenstellung, musterloesung, kategorie, schwerigkeit, discrimination)" \
                     " VALUES (%s, %s, %s, %s, %s, %s)"

    try:
        cur = conn.cursor()
        for index, row in df.iterrows():
            row = row.tolist()
            musterloesung = str(row[2]) if not isinstance(row[2], int) else str(int(row[2]))
            row = [row[0], row[1], musterloesung, row[3], row[4], row[5]]
            cur.execute(sql_insert_row, tuple(row))
            print(f"Row inserted successfully")
        cur.close()
        conn.commit()
    except Exception as e:
        print(f"Error inserting row: {e}")
        conn.rollback()


# Import data from Excel file
excel_file_path = r"/Users/jialu/Desktop/Gitlab/recommandation-system/KRW.xlsx"
df = pd.read_excel(excel_file_path, dtype={'musterloesung': str})

conn = create_conn()
if conn is not None:
    create_table(conn)

    # Insert data into table
    insert_rows(conn, df)

    # Close database connection
    conn.close()
else:
    print("Error connecting to database")
