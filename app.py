from flask import Flask, render_template
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func

import sqlite3

app = Flask(__name__)

def get_db_connection():
    conn = sqlite3.connect('US_Elections_Statistics2.sqlite')
    conn.row_factory = sqlite3.Row
    return conn

@app.route('/')
def index():
    conn = get_db_connection()
    posts = conn.execute('SELECT * FROM US_Elections').fetchall()
    conn.close()
    return render_template('index.html', posts=posts)    

if __name__ == '__main__':
    app.run(debug=True)    