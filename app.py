import os
from flask import Flask, request, jsonify
from flask_restful import Resource, Api
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_marshmallow import Marshmallow
from  sqlalchemy.sql.expression import func
import random
import numpy as np
import psycopg2
from sqlalchemy import func

app = Flask(__name__, static_folder='frontend/build/static')

api = Api(app)

CORS(app)

app.config["SQLALCHEMY_DATABASE_URI"] = "postgresql://postgres:472372239@localhost/users"

db = SQLAlchemy(app)
ma = Marshmallow(app)

flask_migrate = Migrate(app, db)


# create a class UserModel
class Users(db.Model):
    __tablename__ = "studentUsers"
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(), unique=True, )
    password = db.Column(db.String())

    def __init__(self, username, password):  # constractor for the object
        self.username = username
        self.password = password


class Exercises(db.Model):
    __tablename__ = "aufgaben"
    id = db.Column(db.Integer, primary_key=True)
    aufgabenstellung = db.Column(db.String())
    musterloesung = db.Column(db.String())
    kategorie = db.Column(db.String())
    schwerigkeit = db.Column(db.Integer)

    def __init__(self, aufgabenstellung, musterloesung):  # constractor for the object
        self.aufgabenstellung = aufgabenstellung
        self.musterloesung = musterloesung

    def __repr__(self):
        return '<username{}'.format(self.username)

class Leistung(db.Model):
    __tablename__ = "leistung"
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String())
    kategorie = db.Column(db.String(),unique=True)
    score = db.Column(db.Integer)
    done = db.Column(db.Integer)
    schwerigkeit = db.Column(db.Integer)

    def __init__(self, username, kategorie, score, done, schwerigkeit):
        self.username = username
        self.kategorie = kategorie
        self.score = score
        self.done = done
        self.schwerigkeit = schwerigkeit

class UserSchema(ma.Schema):
    class Meta:
        fields = ("id", "username", "password")


user_schema = UserSchema()
user_schema = UserSchema(many=True)

class AufgabeSchema(ma.Schema):
    class Meta:
        fields = ("id", "aufgabenstellung", "musterloesung", "kategorie", "schwerigkeit")

aufgabe_schema = AufgabeSchema()
aufgabe_schema = AufgabeSchema(many=True)

class LeistungSchema(ma.Schema):
    class Meta:
        fields = ("id", "username", "kategorie", "score", "done", "schwerigkeit")

leistung_schema = LeistungSchema()
leistung_schema = LeistungSchema(many=True)


@app.route("/get", methods=["GET"])
def get_users():
    all_users = Users.query.all()
    results = user_schema.dump(all_users)
    return jsonify(results)


@app.route("/get/<id>", methods=["GET"])
def get_user_with_id(id):
    user = Users.query.get(id)
    return UserSchema().jsonify(user)


@app.route("/add", methods=['POST'])
def add_users():
    username = request.json["username"]
    password = request.json["password"]

    users = Users(username, password)
    db.session.add(users)
    db.session.commit()
    return UserSchema().jsonify(users)


@app.route("/update/<id>", methods=["PUT"])
def update_user_with_id(id):
    user = Users.query.get(id)

    username = request.json["username"]
    password = request.json["password"]

    user.username = username
    user.password = password

    db.session.commit()

    return UserSchema().jsonify(user)

@app.route("/getaufgabe", methods=["GET"])
def get_aufgabe():
#    all_aufgabe = Exercises.query.all()
#    for x in range(3):
    all_aufgabe = Exercises.query.order_by(func.random()).limit(3).all()
#    all_aufgabe = Exercises.query.filter(Exercises.id == random.randint(1,Exercises.query.count()))
#        all_aufgabe = np.append(all_aufgabe, all_aufgabe)
    results = aufgabe_schema.dump(all_aufgabe)
    return jsonify(results)

@app.route("/leistung", methods=['POST'])
def update_leistung():
    username = request.json["username"]
    kategorie = request.json["kategorie"]
    score = request.json["score"]
    done = request.json["done"]
    schwerigkeit = request.json["schwerigkeit"]
    leistung = Leistung(username, kategorie, score, done, schwerigkeit)
    db.session.add(leistung)
    db.session.commit()
    return LeistungSchema().jsonify(leistung)

@app.route("/updateleistung/<username>", methods=["PUT"])
def update_leistung_with_username(username):
    leistung = Leistung.query.filter(Leistung.username == username).filter(Leistung.kategorie == 'Math').first()
    # request.json["kategorie"]
    score = request.json["score"]
    done = request.json["done"]
    schwerigkeit = request.json["schwerigkeit"]

    leistung.score = score
    leistung.done = done
    leistung.schwerigkeit = schwerigkeit

    db.session.commit()

    return LeistungSchema().jsonify(leistung)

SECRET_KEY = 'i_love_u'
@app.route('/api/login', methods=['POST'])
def login():
  data = request.get_json()
  username = data['username']
  password = data['password']

  user = Users.query.filter_by(username=username, password=password).first()
  # return UserSchema().jsonify(user)
  # Login successful, generate a JWT token
  if user is not None:
      # Login successful, generate a JWT token
      token = jwt.encode({'user_name': user.username}, SECRET_KEY, algorithm='HS256')
      response = jsonify({'success': True, 'token': token})
      response.headers['Access-Control-Allow-Origin'] = 'http://localhost:3000'
      return response
  else:
      # Login failed
      response = jsonify({'success': False, 'message': 'Invalid login credentials'})
      response.headers['Access-Control-Allow-Origin'] = 'http://localhost:3000'
      return response

  @app.route('/api/register', methods=['POST'])
  def register():
      data = request.get_json()
      username = data['username']
      password = data['password']
      user = Users.query.filter_by(username=username).first()
      if user:
          return jsonify({'error': 'User already exists'})
      new_user = Users(username=username, password=password)
      db.session.add(new_user)
      db.session.commit()
      return jsonify({'message': 'User created successfully'})

if __name__ == '__main__':
    app.run('127.0.0.1', port=5000, debug=True)
