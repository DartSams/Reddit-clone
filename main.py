from flask import Flask,render_template
from dotenv import load_dotenv
from flask_socketio import SocketIO
from flask import Flask, session
from flask_bcrypt import Bcrypt  # encrypt passwords
from pymongo import MongoClient
import os
import time
from time_func import *

load_dotenv()
app = Flask(__name__)
bcrypt = Bcrypt(app)  ##to encrypt passwd https://flask-bcrypt.readthedocs.io/en/latest/
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app)

mongo_password = os.environ.get("mongo_password")
mongodb_string = f"mongodb+srv://DartSams:{mongo_password}@personal-cluser-db.qavgfkq.mongodb.net/?retryWrites=true&w=majority"
client = MongoClient(mongodb_string)
mydb = client["Personal_db"] #database in cluster
post_table = mydb["Reddit-Post"] #table in database
user_table = mydb["Reddit-Users"]

@app.route("/")
def home():
    data = {
        "all-post":list(post_table.find({},{"_id":0}))
    }
    print(data)
    return render_template("home.html",data=data)

@socketio.on("create_post")
def create_post(data):
    current_date_time = time.ctime()
    #Creating Post: {'post': 1, 'subreddit': 'adminTest', 'title': 'first post test', 'text': 'fvfdb', 'user': 'dartsams', 'postedAgo': 'now'}
    print(f"New post data recieved: {data}")
    data = {
        "author":data["user"],
        "post-date": split_compare_date(current_date_time),
        "post-time":calculate_post_time(),
        "post-num":data["post"],
        "subreddit":data["subreddit"],
        "title":data["title"],
        "post-text":data["text"],
        "likes":data["likes"]
    }
    print(f"Creating new post {data}")
    post_table.insert_one(data)


@socketio.on("login")
def login(data):
    print(f"Checking DB for user: {data}")
    data = {
        "username":data["username"],
    }

    query = user_table.find(data)
    for i in query: #iterates through found db entry
        # print(i)
        passwd_check = bcrypt.check_password_hash(i["password"], data["password"]) #iterates through found query and checks the hashed password in to the typed password on browser sent here returns true or false
        # print(passwd_check)

    if passwd_check != True and query == True: #if username found in db but password is wrong flashes password is wrong
        return False

    if query != True: #if user is not found in db
        return False

    session["username"] = data["username"] #if user is found in db then sets browser session to their data
    
    # print(session)

@socketio.on("register")
def register(data):
    # using the bcrypt library hashes the password
    hash_passwd = bcrypt.generate_password_hash(data["password"]).decode("utf-8")
    data = {
        "username":data["username"]
    }
    query = user_table.find(data)
    if query != True: #if user tries registering with a username thats not already in db then creates a new entry
        data = {
            "username":data["username"],
            "password":hash_passwd
        }

        user_table.insert_one(data)
        print(f"Regisrering account: {data}")
 
@socketio.on("like_post")
def like_post(data):
    print(f"Liking Post: {data}")

@socketio.on("dislike_post")
def like_post(data):
    print(f"Disliking Post: {data}")
    socketio.emit("dislike")
    
if __name__ == "__main__":
    # app.run(port=8000,debug=True)
    socketio.run(app,port=8000,debug=True)


##TODO
#make registration page
#make login page
#make a new page designed to create post
#need to fix bug of feed sidebar not working (being overshadowed)