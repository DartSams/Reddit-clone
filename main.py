from flask import Flask,render_template
from dotenv import load_dotenv
from flask_socketio import SocketIO
from pymongo import MongoClient
import os

load_dotenv()
app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app)

mongo_password = os.environ.get("mongo_password")
mongodb_string = f"mongodb+srv://DartSams:{mongo_password}@personal-cluser-db.qavgfkq.mongodb.net/?retryWrites=true&w=majority"
client = MongoClient(mongodb_string)
mydb = client["Personal_db"]
post_table = mydb["Post"]

@app.route("/")
def home():
    return render_template("home.html")

@socketio.on("create_post")
def create_post(data):
    print(f"Creating Post" + data)


@socketio.on("like_post")
def like_post(data):
    print(f"Liking Post" + data)
    
if __name__ == "__main__":
    # app.run(port=8000,debug=True)
    socketio.run(app,port=8000,debug=True)

