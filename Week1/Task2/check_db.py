import os
from app import app, db
from models import User

with app.app_context():
    db.create_all()

db_path = os.path.abspath('database.db')
print("Database path:", db_path)

import sqlite3
conn = sqlite3.connect('database.db')
cursor = conn.cursor()

cursor.execute("SELECT name FROM sqlite_master WHERE type='table';")
tables = cursor.fetchall()

print("Tables in the database:", tables)

conn.close()
