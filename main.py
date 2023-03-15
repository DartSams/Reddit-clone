from flask import Flask, render_template, redirect, request
from dotenv import load_dotenv
from flask_socketio import SocketIO,emit
from flask_bcrypt import Bcrypt  # encrypt passwords
from pymongo import MongoClient
import os
import time
from time_func import *

load_dotenv()
app = Flask(__name__)
bcrypt = Bcrypt(app)  ##to encrypt passwd https://flask-bcrypt.readthedocs.io/en/latest/
app.config['SECRET_KEY'] = 'secret!'
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
socketio = SocketIO(app)

mongo_password = os.environ.get("mongo_password")
mongodb_string = f"mongodb+srv://DartSams:{mongo_password}@personal-cluser-db.qavgfkq.mongodb.net/?retryWrites=true&w=majority"
client = MongoClient(mongodb_string)
mydb = client["Personal_db"] #database in cluster
post_table = mydb["Reddit-Post"] #table in database
user_table = mydb["Reddit-Users"]


def user_data(username):
    data = {
        "username":username
    }
    query = list(user_table.find(data))
    return query.pop()




@app.route("/")
def home():
    data = {
        "all-post":list(post_table.find({},{"_id":0})),
    }

    return render_template("home.html",data=data)

@app.route("/create_post")
def create_post():
    return render_template("create_post.html")

@socketio.on("profile")
def profile(data):
    post = []
    db_data = {
        "username":data["username"],
    }
    query = user_table.find(db_data)
    if query:
        name = user_data(data["username"])["username"] #if user is found in db then sets local variable to their name
        user_subreddit_lst = user_data(data["username"])["subreddit_lst"]

        for i in user_subreddit_lst:
            # list(post_table.find({"author":name,"subreddit":i},{"_id":0}))
            
            # print(post_table.find({"author":name,"subreddit":i},{"_id":0}))
            for j in post_table.find({"author":name,"subreddit":i},{"_id":0}):
                # print(j)
                post.append(j)

        print(post)
    
        emit("load_profile",{"post":post})


@socketio.on("create_post")
def create_post(data):
    current_date_time = time.ctime()
    #Creating Post: {'post': 1, 'subreddit': 'adminTest', 'title': 'first post test', 'text': 'fvfdb', 'user': 'dartsams', 'postedAgo': 'now'}
    print(f"New post data recieved: {data}")
    most_recent_post = recent_post()
    data = {
        "author":data["user"],
        "post-date": split_compare_date(current_date_time),
        "post-time":calculate_post_time(),
        "post-num":most_recent_post,
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
    db_data = {
        "username":data["username"],
    }

    query = user_table.find(db_data)
    for i in query: #iterates through found db entry
        # print(i)
        passwd_check = bcrypt.check_password_hash(i["password"], data["password"]) #iterates through found query and checks the hashed password in to the typed password on browser sent here returns true or false
        print(passwd_check)

    if passwd_check != True and query == True: #if username found in db but password is wrong flashes password is wrong
        return False

    if query != True: #if user is not found in db
        return False

    # session["username"] = data["username"] #if user is found in db then sets browser session to their data
    # session["username"] = db_data["username"]
    if passwd_check: #if bycrypt check hash function returns True then emits a signal to frontend to allow user session
        emit("found_user",{"username":data["username"]}) #if user is found in db then sets browser session to their data

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
            "password":hash_passwd,
            "subreddit_lst":[]
        }

        user_table.insert_one(data)
        print(f"Regisrering account: {data}")
        # session["username"] = data["username"]
        emit("found_user",{"username":data["username"]}) #if user is found in db then sets browser session to their data
 
@socketio.on("like_post")
def like_post(data):
    print(f"Liking Post: {data}")
    old_data = {
        "post-num":data["post"],
    }

    new_data = {
        "$set":{
            "likes":data["likes"]
        }
    }

    post_table.update_one(old_data,new_data)

@socketio.on("dislike_post")
def like_post(data):
    print(f"Disliking Post: {data}")
    old_data = {
        "post-num":data["post"],
    }

    new_data = {
        "$set":{
            "likes":data["likes"]
        }
    }

    post_table.update_one(old_data,new_data)

@socketio.on("get_max_num_post")
def get_max_num_post():
    emit("returned_max_num_post",{"max_num":recent_post()})

def recent_post(): #queries the db to find the post with the biggest post-num id
    most_recent_post = max(list(post_table.find()),key=lambda i:i["post-num"])
    # print(most_recent_post)
    return most_recent_post["post-num"] + 1








@socketio.on("join_subreddit")
def join_subreddit(data):
    lst = [] #list to hold all subreddits
    db_data = {
        "username":data["username"],
    }

    query = user_table.find(db_data)
    for i in query:
        # print(type(i["subreddit_lst"]))
        for sub in i["subreddit_lst"]: #gets all subreddits that the user are already in and append them to list
            lst.append(sub)

    if data["subreddit"] not in lst: #use cant join subreddit if already in it
        lst.append(data["subreddit"]) #adds new subreddit to list

    myquery = { "username": data["username"] }
    newvalues = { "$set": { 
        "subreddit_lst": lst
        }
    } #updates user subreddit list to include new and old subreddits

    user_table.update_one(myquery, newvalues)


if __name__ == "__main__":
    # app.run(port=8000,debug=True)
    socketio.run(app,port=8000,debug=True)


##TODO
#make registration page
#make login page
#make a new page designed to create post
#need to fix bug of feed sidebar not working (being overshadowed)