from flask import Flask,render_template
from dotenv import load_dotenv
from flask_socketio import SocketIO
from pymongo import MongoClient
import os
import time
from time_func import *

load_dotenv()
app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app)

mongo_password = os.environ.get("mongo_password")
mongodb_string = f"mongodb+srv://DartSams:{mongo_password}@personal-cluser-db.qavgfkq.mongodb.net/?retryWrites=true&w=majority"
client = MongoClient(mongodb_string)
mydb = client["Personal_db"] #database in cluster
post_table = mydb["Reddit-Post"] #table in database

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
#make a backend function to get all post and display to frontend