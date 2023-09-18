import os
import hashlib
from collections import defaultdict

import jwt
import datetime
from flask import Flask, request, jsonify
from flask_restful import Api
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_marshmallow import Marshmallow
import math
from scipy.optimize import minimize_scalar
import random
from sqlalchemy import func
from datetime import datetime, timedelta
from sqlalchemy import cast, DateTime

app = Flask(__name__, static_folder='frontend/build/static')

api = Api(app)

CORS(app, origins=["http://localhost:3000", "http://www.indilearnlj.de"])

# to avoid CORS policy: No 'Access-Control-Allow-Origin'

app.config["SQLALCHEMY_DATABASE_URI"] = "postgresql://postgres:472372239@localhost/users"
# app.config["SQLALCHEMY_DATABASE_URI"] = "mysql+pymysql://lujia2023:123456@92.205.13.53:3306/indilearn"
# app.config["SQLALCHEMY_DATABASE_URI"] = "mysql+pymysql://admin:123456@92.205.13.53/indilearn"

db = SQLAlchemy(app)
ma = Marshmallow(app)

flask_migrate = Migrate(app, db)


# create a class UserModel
class Users(db.Model):
    __tablename__ = "studentUsers"
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(), unique=True)
    password = db.Column(db.String())
    userTyp = db.Column(db.String())

    def __init__(self, username, password, userTyp):  # 注意参数名修改为 userTyp
        self.username = username
        self.password = password
        self.userTyp = userTyp  # 确保参数名称与字段名称一致


class UserRanks(db.Model):
    __tablename__ = "user_ranks"
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(), db.ForeignKey('studentUsers.username'), index=True,
                         nullable=False)  # Correct foreign key reference to username in Users table
    rank = db.Column(db.Integer, default=0)

    def __init__(self, username, rank):
        self.username = username
        self.rank = rank


class Subjects(db.Model):  # to connect user with his selected subject
    __tablename__ = "mysubject"
    id = db.Column(db.Integer, primary_key=True)
    fachname = db.Column(db.String())
    username = db.Column(db.String())

    def __init__(self, fachname, username):  # constractor for the object
        self.fachname = fachname
        self.username = username


class Exercises(db.Model):
    __tablename__ = "aufgaben"
    id = db.Column(db.Integer, primary_key=True)
    aufgabenstellung = db.Column(db.String())
    musterloesung = db.Column(db.String())
    kategorie = db.Column(db.String())
    schwerigkeit = db.Column(db.Float(precision=1))
    discrimination = db.Column(db.Float(precision=1))

    def __init__(self, aufgabenstellung, musterloesung, kategorie, schweigkeit,
                 discrimination):  # constractor for the object
        self.aufgabenstellung = aufgabenstellung
        self.musterloesung = musterloesung
        self.kategorie = kategorie
        self.schwerigkeit = schweigkeit
        self.discrimination = discrimination

    def __repr__(self):
        return '<username{}'.format(self.username)


class Leistung(db.Model):
    __tablename__ = "leistung"
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String())
    aufgabestellung = db.Column(db.String())
    score = db.Column(db.Boolean)
    kategorie = db.Column(db.String())
    schwerigkeit = db.Column(db.Float(precision=1))
    typ = db.Column(db.String())  # 新添加的列
    zeitpunkt = db.Column(db.String())

    def __init__(self, username, aufgabestellung, score, kategorie, schwerigkeit, typ, zeitpunkt):
        self.username = username
        self.aufgabestellung = aufgabestellung
        self.score = score
        self.kategorie = kategorie
        self.schwerigkeit = schwerigkeit
        self.typ = typ
        self.zeitpunkt = zeitpunkt


class Level(db.Model):  # student faehigkeit
    __tablename__ = "level"
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String())
    faehigkeit = db.Column(db.Float(precision=1))
    kategorie = db.Column(db.String())
    create_time = db.Column(db.DateTime, default=datetime.utcnow)

    # "time" record the current UTC time when a new instance of the Level model is created.

    def __init__(self, username, faehigkeit, kategorie):
        self.username = username
        self.faehigkeit = faehigkeit
        self.kategorie = kategorie


class UserSchema(ma.Schema):
    class Meta:
        fields = ("id", "username", "password", "userTyp")


user_schema = UserSchema()
user_schema = UserSchema(many=True)


class AufgabeSchema(ma.Schema):
    class Meta:
        fields = ("id", "aufgabenstellung", "musterloesung", "kategorie", "schwerigkeit", "discrimination")


aufgabe_schema = AufgabeSchema()
aufgabe_schema = AufgabeSchema(many=True)


class SubjectSchema(ma.Schema):
    class Meta:
        fields = ("id", "fachname", "username")


sub_schema = SubjectSchema()
sub_schema = SubjectSchema(many=True)


class LeistungSchema(ma.Schema):
    class Meta:
        fields = ("id", "username", "aufgabestellung", "score", "kategorie", "schwerigkeit", "zeitpunkt", "typ")


leistung_schema = LeistungSchema()
leistung_schemas = LeistungSchema(many=True)


class LevelSchema(ma.Schema):
    class Meta:
        fields = ("id", "username", "faehigkeit", "kategorie")


level_schema = LevelSchema()
level_schema = LevelSchema(many=True)


@app.route("/get", methods=["GET"])
def get_users():
    all_users = Users.query.all()
    results = user_schema.dump(all_users)
    return jsonify(results)


@app.route("/get/<username>", methods=["GET"])
def get_user_with_name(username):
    user = Users.query.filter(Users.username == username)
    return UserSchema().jsonify(user)


@app.route("/add", methods=['POST'])
def add_users():
    username = request.json["username"]
    password = request.json["password"]

    users = Users(username, password)
    db.session.add(users)
    db.session.commit()
    return UserSchema().jsonify(users)


@app.route("/update/<username>", methods=["PUT"])
def update_pwd_with_name(username):
    user = Users.query.filter(Users.username == username).first()
    password = request.json["password"]
    # Add a check to make sure the password is not empty
    if not password:
        return jsonify({"error": "Password cannot be empty"}), 400

    encodedpwd = hash_password(password)
    user.username = username
    user.password = encodedpwd

    db.session.commit()
    response = jsonify({'username': username, 'password': password})
    response.headers['Access-Control-Allow-Origin'] = 'http://localhost:3000'
    return response


def calculateProbability(a, b, x):
    return math.exp((b * (x - a))) / (1 + math.exp((b * (x - a))))


@app.route("/getaufgabe/<username>/<kategorie>", methods=["GET"])
def get_aufgabe(username, kategorie):
    level = Level.query.filter_by(username=username, kategorie=kategorie).first()
    if not level:
        # 没有找到 Level 记录，将 latest_ability 设为 0
        latest_ability = 0
    else:
        latest_record = Level.query.filter(Level.username == username, Level.kategorie == kategorie).order_by(
            Level.create_time.desc()).limit(3).first()
        latest_ability = latest_record.faehigkeit

    all_aufgabe = Exercises.query.filter(Exercises.kategorie == kategorie).all()
    filtered_aufgaben = [aufgabe for aufgabe in all_aufgabe if
                         0.25 < calculateProbability(aufgabe.schwerigkeit, aufgabe.discrimination,
                                                     latest_ability) < 0.75]
    filtered_aufgaben = random.sample(filtered_aufgaben, 4)

    results = aufgabe_schema.dump(filtered_aufgaben)
    print("Returned data:", results)
    return jsonify(results)


@app.route("/getaufgabeNormal/<username>/<kategorie>", methods=["GET"])
def get_nonRSaufgabe(username, kategorie):
    level = Level.query.filter_by(username=username, kategorie=kategorie).first()
    if not level:
        latest_ability = 0
    else:
        filtered_exercises = Exercises.query.filter(
            func.abs(Exercises.schwerigkeit - level.faehigkeit) < 0.1
        ).all()
        # 筛选的条件是，练习题的难度与学生的能力之差小于 0.1

        selected_exercises = random.sample(filtered_exercises, 4)

        results = aufgabe_schema.dump(selected_exercises)
        print("Returned data:", results)
        return jsonify(results)


@app.route("/getleistung/<username>", methods=["GET"])
def get_leistung(username):
    all_leistung = Leistung.query.filter(Leistung.username == username).all()

    results = leistung_schema.dump(all_leistung)
    return jsonify(results)


@app.route("/getkategories", methods=["GET"])
def get_kategories():
    all_kategories = Exercises.query.with_entities(Exercises.kategorie).distinct().all()
    kategories = []
    for kategorie in all_kategories:
        kategories.append(kategorie[0])

    return jsonify(kategories)


@app.route("/getkategories/<username>", methods=["GET"])
def get_kategories_by_name(username):
    all_kategories = Subjects.query.filter(Subjects.username == username).distinct(Subjects.fachname).all()
    kategories = []
    for kategorie in all_kategories:
        kategories.append(kategorie.fachname)

    return jsonify(kategories)


@app.route("/addsubject", methods=['POST'])
def add_sub():
    fachname = request.json["fachname"]
    username = request.json["username"]

    subject = Subjects.query.filter_by(username=username, fachname=fachname).first()
    if subject:
        response = jsonify({'error': 'you have added this course already'})
        response.headers['Access-Control-Allow-Origin'] = 'http://localhost:3000'
        return response

    newSubject = Subjects(fachname, username)
    db.session.add(newSubject)
    db.session.commit()
    return UserSchema().jsonify(newSubject)


def G(A, B, C, D):
    def g(x):
        def right(A, B):
            func = ""
            for i in range(len(A)):
                a = str(A[i])
                b = str(B[i])
                if i != len(A) - 1:
                    func = func + "((math.exp(" + a + "*(x-" + b + ")))/(1+math.exp(" + a + "*(x-" + b + "))))*"
                else:
                    func = func + "((math.exp(" + a + "*(x-" + b + ")))/(1+math.exp(" + a + "*(x-" + b + "))))"
            return func

        def wrong(C, D):

            func = ""
            for i in range(len(C)):
                c = str(C[i])
                d = str(D[i])
                func = func + "*(1-((math.exp(" + c + "*(x-" + d + ")))/(1+math.exp(" + c + "*(x-" + d + ")))))"
            return func

        return eval("-" + right(A, B) + wrong(C, D))

    res = minimize_scalar(g, method='brent')
    return res.x


def R(A, B):  # All Right
    def r(x):
        func = ""
        for i in range(len(A)):
            a = str(A[i])
            b = str(B[i])
            if i != len(A) - 1:
                func = func + "((math.exp(" + a + "*(x-" + b + ")))/(1+math.exp(" + a + "*(x-" + b + "))))*"
            else:
                func = func + "((math.exp(" + a + "*(x-" + b + ")))/(1+math.exp(" + a + "*(x-" + b + "))))"
        Tfunc = "1-" + func
        R_func = "-(" + func + ")*(" + Tfunc + ")"
        return eval(R_func)

    res = minimize_scalar(r, method='brent')
    return res.x


def W(C, D):  # All Wrong
    def w(x):
        func = ""
        for i in range(len(C)):
            c = str(C[i])
            d = str(D[i])
            if i != len(C) - 1:
                func = func + "(1-(math.exp(" + c + "*(x-" + d + ")))/(1+math.exp(" + c + "*(x-" + d + "))))*"
            else:
                func = func + "(1-(math.exp(" + c + "*(x-" + d + ")))/(1+math.exp(" + c + "*(x-" + d + "))))"
        Tfunc = "1-" + func
        W_func = "-(" + func + ")*(" + Tfunc + ")"
        return eval(W_func)

    res = minimize_scalar(w, method='brent')
    return res.x


@app.route("/addleistung", methods=["POST"])
def add_leistung():
    username = request.json["username"]
    aufgabestellung = request.json["aufgabestellung"]
    score = request.json["score"]
    kategorie = request.json["kategorie"]
    schwerigkeit = request.json["schwerigkeit"]
    zeitpunkt = request.json["zeitpunkt"]
    typ = request.json["typ"]

    leistung = Leistung(username, aufgabestellung, score, kategorie, schwerigkeit, typ, zeitpunkt)  # 传递typ的值

    app.logger.info(leistung.id)  # 访问leistung对象的id属性

    db.session.add(leistung)
    db.session.commit()

    return LeistungSchema().jsonify(leistung)


@app.route("/addlevel", methods=['POST'])
def add_level():
    try:
        print("Received request", request)
        username = request.json["username"]
        faehigkeit = request.json["faehigkeit"]
        kategorie = request.json["kategorie"]

        print("Received username: %s", username)
        print("Received faehigkeit: %s", faehigkeit)
        print("Received kategorie: %s", kategorie)
        print("Received time: %s", request.json["zeit"])

        Init_Level = Level.query.filter(Level.username == username).filter(Level.kategorie == kategorie).all()

        if (len(Init_Level) == 0):
            newLevel = Level(username, faehigkeit, kategorie)

        else:
            zeit = request.json["zeit"]
            print("zeit is: ", zeit)
            R_Aufgaben = Leistung.query.join(Exercises, Leistung.aufgabestellung == Exercises.aufgabenstellung).filter(
                Leistung.zeitpunkt == zeit).filter(Leistung.score == True).with_entities(Exercises.schwerigkeit,
                                                                                         Exercises.discrimination).all()
            print("R_Aufgaben,", R_Aufgaben)

            R_Parameter = [{}, {}]
            W_Aufgaben = Leistung.query.join(Exercises, Leistung.aufgabestellung == Exercises.aufgabenstellung).filter(
                Leistung.zeitpunkt == zeit).filter(Leistung.score == False).with_entities(Exercises.schwerigkeit,
                                                                                          Exercises.discrimination).all()
            W_Parameter = [{}, {}]
            print("W_Aufgaben,")
            print(W_Aufgaben)
            print(R_Aufgaben, W_Aufgaben)

            if (len(R_Aufgaben) != 0 and len(W_Aufgaben) != 0):

                for i in range(len(R_Aufgaben)):
                    R_Parameter[0][i] = R_Aufgaben[i][0]
                    R_Parameter[1][i] = R_Aufgaben[i][1]

                for j in range(len(W_Aufgaben)):
                    W_Parameter[0][j] = W_Aufgaben[j][0]
                    W_Parameter[1][j] = W_Aufgaben[j][1]

                faehigkeit = G(R_Parameter[1], R_Parameter[0], W_Parameter[1], W_Parameter[0])

                print("right disc:", R_Parameter[1])
                print("right dif:", R_Parameter[0])
                print("wrong disc:", W_Parameter[1])
                print("wrong dif:", W_Parameter[0])
                print(faehigkeit)

            if (len(R_Aufgaben) == 0):

                for j in range(len(W_Aufgaben)):
                    W_Parameter[0][j] = W_Aufgaben[j][0]
                    W_Parameter[1][j] = W_Aufgaben[j][1]

                faehigkeit = W(W_Parameter[1], W_Parameter[0])
                print("all wrong", faehigkeit)

            if (len(W_Aufgaben) == 0):

                for j in range(len(R_Aufgaben)):
                    R_Parameter[0][j] = R_Aufgaben[j][0]
                    R_Parameter[1][j] = R_Aufgaben[j][1]

                faehigkeit = R(R_Parameter[1], R_Parameter[0])
                print("all right", faehigkeit)
            faehigkeits = Level.query.filter(Level.username == username, Level.kategorie == kategorie).order_by(
                Level.create_time.desc()).with_entities(Level.faehigkeit).limit(4).all()
            print("recently 4 faehigkeit:", faehigkeits)
            newest_faehig = faehigkeits[0][0]
            current_faehig = 0

            for i in range(len(faehigkeits)):
                current_faehig += faehigkeits[i][0]
            if (newest_faehig - faehigkeit > 0.3):
                faehigkeit = newest_faehig - 0.3
                print("newest", faehigkeit)
            if (faehigkeit - newest_faehig > 0.5):
                faehigkeit = newest_faehig + 0.5
            faehigkeit = (current_faehig + faehigkeit) / (len(faehigkeits) + 1)

            print("Calculated faehigkeit: %s", faehigkeit)
            # else:
            #     faehigkeit = Level.query.filter(Level.username == username, Level.kategorie == kategorie).order_by(
            #         Level.create_time.desc()).with_entities(Level.faehigkeit).limit(1).all()
            #     faehigkeit = faehigkeit[0][0] - 0.1

            newLevel = Level(username, faehigkeit, kategorie)
        db.session.add(newLevel)
        db.session.commit()
        print("Added newLevel to the database")
        response = LevelSchema().jsonify(newLevel)
        response.headers.add('Access-Control-Allow-Origin', 'http://localhost:3000')
        return response

    except Exception as e:
        print("Error:", e)
        return {"error": str(e)}, 500


@app.route("/getrank/<username>", methods=['GET'])
def get_rank_by_username(username):
    user_ranks = UserRanks.query.filter_by(username=username).first()
    if user_ranks:
        return jsonify({'username': user_ranks.username, 'rank': user_ranks.rank})
    else:
        return jsonify({'message': 'Rank not found'})


# addrank API
@app.route("/addrank/<username>/<int:rank>", methods=['POST'])
def add_rank(username, rank):
    user_ranks = UserRanks.query.filter_by(username=username).first()
    if user_ranks:
        user_ranks.rank += rank
    else:
        user_ranks = UserRanks(username=username, rank=rank)
        db.session.add(user_ranks)
    db.session.commit()
    return jsonify({'message': 'Rank updated successfully'})


@app.route("/getallranks", methods=['GET'])
def get_all_ranks():
    all_ranks = UserRanks.query.all()
    ranks_data = [{'username': rank.username, 'rank': rank.rank} for rank in all_ranks]
    return jsonify(ranks_data)


@app.route("/getlevel/<username>", methods=['GET'])
def get_level_by_username(username):
    subquery = db.session.query(func.max(Level.create_time).label('max_create_time')).filter(
        Level.username == username).group_by(Level.kategorie).subquery()
    levels = db.session.query(Level).join(subquery, Level.create_time == subquery.c.max_create_time).filter(
        Level.username == username).all()
    if levels:
        return LevelSchema(many=True).jsonify(levels)
    else:
        return jsonify({'message': 'Levels not found'})


SECRET_KEY = 'i_love_u'
app.config['SECRET_KEY'] = 'your-secret-key'


@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data['username']
    password = data['password']

    user = Users.query.filter_by(username=username).first()
    # return UserSchema().jsonify(user)
    # Login successful, generate a JWT token
    if not user:  # first to check if there is  such a username in db
        response = jsonify({'success': False, 'message': 'User not found'})
        response.headers['Access-Control-Allow-Origin'] = 'http://localhost:3000'
        return response

    hashed_password = user.password  # password check
    if check_password(password, hashed_password):
        usertype = user.userTyp
        token = jwt.encode({'user_name': user.username}, SECRET_KEY, algorithm='HS256')
        response = jsonify(
            {'success': True, 'token': token, 'username': username, 'password': password, 'usertype': usertype})
        response.headers['Access-Control-Allow-Origin'] = 'http://localhost:3000'
        return response
    else:
        # Login failed
        response = jsonify({'success': False, 'message': 'Incorrect password'})
        response.headers['Access-Control-Allow-Origin'] = 'http://localhost:3000'
        return response


@app.route('/addSubject', methods=['POST'])
def add_subject():
    data = request.get_json()
    fachname = data['fachname']
    username = data['username']

    subject = Subjects.query.filter_by(username=username, fachname=fachname).first()
    if subject:
        response = jsonify({'error': 'course already have, please chose another one'})
        response.headers['Access-Control-Allow-Origin'] = 'http://localhost:3000'
        return response
    new_sub = Subjects(fachname=fachname, username=username)
    db.session.add(new_sub)
    db.session.commit()
    response = jsonify({'message': 'successfully add a course'})
    response.headers['Access-Control-Allow-Origin'] = 'http://localhost:3000'
    return response


@app.route('/api/register', methods=['POST'])
def register():
    data = request.get_json()
    username = data['username']
    password = data['password']
    userTyp = data['userType']  # Added userType field

    user = Users.query.filter_by(username=username).first()
    if user:
        response = jsonify({'error': 'User already exists'})
        response.headers['Access-Control-Allow-Origin'] = 'http://localhost:3000'
        return response

    new_user = Users(username=username, password=hash_password(password),
                     userTyp=userTyp)  # Store userType in the database
    db.session.add(new_user)
    db.session.commit()

    response = jsonify({'message': 'User created successfully'})
    response.headers['Access-Control-Allow-Origin'] = 'http://localhost:3000'
    return response


@app.route("/delete-user/<username>", methods=['DELETE'])
def delete_user(username):
    try:
        # 查找要删除的用户数据
        user = Users.query.filter_by(username=username).first()

        if not user:
            return jsonify({"message": f"User with username {username} not found."}), 404

        # 删除用户数据
        Subjects.query.filter_by(username=username).delete()

        # 删除与用户相关的 Leistung 数据
        Leistung.query.filter_by(username=username).delete()

        # 删除与用户相关的 Level 数据
        Level.query.filter_by(username=username).delete()

        UserRanks.query.filter_by(username=username).delete()

        db.session.delete(user)
        db.session.commit()

        return jsonify({"message": f"User with username {username} has been deleted successfully."}), 200
    except Exception as e:
        # 处理异常情况
        db.session.rollback()
        return jsonify({"error": "An error occurred while deleting the user.", "details": str(e)}), 500


@app.route("/delete-username/<username>", methods=['DELETE'])
def delete_username(username):
    try:
        # 查找要删除的用户数据
        user = Users.query.filter_by(username=username).first()

        if not user:
            return jsonify({"message": f"User with username {username} not found."}), 404

        # 删除与用户相关的 user_ranks 表中的记录
        UserRanks.query.filter_by(username=username).delete()

        # 设置用户名的占位符值来表示用户账户已被删除
        deleted_username = 'deleted_user=' + user.username
        user.username = deleted_username

        # 更新与用户相关的 Leistung 数据中的用户名
        Leistung.query.filter_by(username=username).update({"username": deleted_username})

        # 更新与用户相关的 Level 数据中的用户名
        Level.query.filter_by(username=username).update({"username": deleted_username})

        db.session.commit()

        return jsonify({"message": f"User with username {username} has been deleted successfully."}), 200
    except Exception as e:
        # 处理异常情况
        db.session.rollback()
        return jsonify({"error": "An error occurred while deleting the user.", "details": str(e)}), 500


@app.route('/statistics/<username>', methods=['GET'])
def get_statistics(username):
    # 获取学生的Leistung数据
    leistungen = Leistung.query.filter_by(username=username).all()

    # 创建一个字典来存储每个时间区间的Leistung总数量
    time_intervals = {}
    for leistung in leistungen:
        leistung_time = datetime.strptime(leistung.zeitpunkt, '%d.%m.%Y, %H:%M:%S')

        # 计算时间区间的起始时间（每三个小时一个区间）
        interval_start = leistung_time.replace(minute=0, second=0, microsecond=0)
        interval_start -= timedelta(hours=leistung_time.hour % 3)

        interval_end = interval_start + timedelta(hours=1)

        interval_str = f"{interval_start.strftime('%H:%M')} - {interval_end.strftime('%H:%M')}"

        # 初始化时间区间计数
        if interval_str not in time_intervals:
            time_intervals[interval_str] = 0

        # 更新时间区间的Leistung总数量
        time_intervals[interval_str] += 1

    return jsonify(time_intervals)


@app.route('/accuracy-all/<username>', methods=['GET'])
def get_accuracy_all(username):
    # 获取学生的Leistung数据
    leistungen = Leistung.query.filter_by(username=username).all()

    # 初始化正确和错误的计数
    correct_count = 0
    total_count = len(leistungen)

    for leistung in leistungen:
        # 如果Leistung的score为True，则计为正确
        if leistung.score == True:
            correct_count += 1

    # 计算正确率
    accuracy = (correct_count / total_count) * 100 if total_count > 0 else 0

    return jsonify({"accuracy": accuracy})


@app.route('/accuracy/<username>', methods=['GET'])
def get_accuracy(username):
    # 获取学生的Leistung数据
    leistungen = Leistung.query.filter_by(username=username).all()

    # 创建一个字典来存储每个时间段的正确和总数
    time_intervals = {}
    for leistung in leistungen:
        leistung_time = datetime.strptime(leistung.zeitpunkt, '%d.%m.%Y, %H:%M:%S')

        # 计算时间区间的起始时间（每三个小时一个区间）
        interval_start = leistung_time.replace(minute=0, second=0, microsecond=0)
        interval_start -= timedelta(hours=leistung_time.hour % 3)

        interval_end = interval_start + timedelta(hours=1)

        interval_str = f"{interval_start.strftime('%H:%M')} - {interval_end.strftime('%H:%M')}"

        # 初始化时间区间的正确和总数计数
        if interval_str not in time_intervals:
            time_intervals[interval_str] = {"correct": 0, "total": 0}

        # 更新时间区间的正确和总数计数
        if leistung.score == True:
            time_intervals[interval_str]["correct"] += 1
        time_intervals[interval_str]["total"] += 1

    # 计算每个时间区间的正确率
    accuracy_intervals = {}
    for interval_str, counts in time_intervals.items():
        if counts["total"] > 0:
            accuracy = (counts["correct"] / counts["total"]) * 100
        else:
            accuracy = 0
        accuracy_intervals[interval_str] = accuracy

    return jsonify(accuracy_intervals)


def hash_password(password: str) -> str:
    # This function takes in a plaintext password as a string and returns a hashed and salted version of the password.
    salt = os.urandom(12)  # generate a random salt
    pwd_hash = hashlib.pbkdf2_hmac(
        "sha256", password.encode(), salt, 100000
    )
    return f"{salt.hex()}:{pwd_hash.hex()}"


def check_password(password: str, hashed_password: str) -> bool:
    """Check a password against a hashed password."""
    salt, pwd_hash = hashed_password.split(":")  # split the salt and hash
    salt = bytes.fromhex(salt)  # convert the salt to bytes
    pwd_hash = bytes.fromhex(pwd_hash)  # convert the hash to bytes
    # hash the password using the same salt and algorithm as before
    new_hash = hashlib.pbkdf2_hmac("sha256", password.encode(), salt, 100000)
    # return True if the new hash matches the original hash, False otherwise
    return pwd_hash == new_hash


if __name__ == '__main__':
    app.run('127.0.0.1', port=5000, debug=True)
