from flask import Flask,render_template
from dotenv import load_dotenv
from flask_socketio import SocketIO


app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app)



@app.route("/")
def home():
    return render_template("home.html")

@socketio.on("like_post")
def like_post(data):
    print(data)
    
if __name__ == "__main__":
    # app.run(port=8000,debug=True)
    socketio.run(app,port=8000,debug=True)

