import os
from flask import Flask, request, jsonify
from flask_restful import Resource, Api
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_marshmallow import Marshmallow
import psycopg2

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

    def __init__(self, aufgabenstellung, musterloesung):  # constractor for the object
        self.aufgabenstellung = aufgabenstellung
        self.musterloesung = musterloesung

    def __repr__(self):
        return '<username{}'.format(self.username)


class UserSchema(ma.Schema):
    class Meta:
        fields = ("id", "username", "password")


user_schema = UserSchema()
user_schema = UserSchema(many=True)




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


if __name__ == '__main__':
    app.run('127.0.0.1', port=5000, debug=True)
