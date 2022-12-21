from flask import Flask, request
from flask_restful import Resource, Api
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
import psycopg2

app = Flask(__name__)

api = Api(app)

CORS(app)

app.config["SQLALCHEMY_DATABASE_URI"] = "postgresql://postgres:472372239@localhost/users"

db = SQLAlchemy(app)

flask_migrate = Migrate(app, db)


# create a class UserModel
class Users(db.Model):

    __tablename__ = "studentUsers"
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String())
    password = db.Column(db.String())


    def init(self, username, password): #constractor for the object
        self.username = username
        self.password = password



class Exercises(db.Model):
    __tablename__ = "aufgaben"
    id = db.Column(db.Integer, primary_key=True)
    aufgabenstellung = db.Column(db.String())
    musterloesung = db.Column(db.String())

    def init(self, aufgabenstellung, musterloesung):  # constractor for the object
        self.aufgabenstellung = aufgabenstellung
        self.musterloesung = musterloesung








@app.route("/", methods= ["GET", "POST"])

def submit():
    if request.method == "POST":
        username = request.form["username"]
        password = request.form["password "]

        student= Users(username,password)
        db.session.add(student)
        db.session.commit()






