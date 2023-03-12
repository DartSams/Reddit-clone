let socket = io();
socket.on('connect', function() {
    console.log("socket connected")
    socket.emit('my event', {data: 'I\'m connected!'});
});

logoButton = document.querySelector("#image-logo");
logoButton.addEventListener("click",function(){
    console.log("Time to go home.")
});

let searchButton = document.querySelector("#search-button");
searchButton.addEventListener("click",function(){
    let searchBarText = document.querySelector("#search-bar").value
    console.log("Searching database.")
    console.log(searchBarText)
    searchBarText = document.querySelector("#search-bar").value = ""
});

let loginButton = document.querySelector("#login-button");
loginButton.addEventListener("click",function(){
    console.log("Time to login.")
    openPopup()
    loginDiv()
});

let profileButton = document.querySelector("#profile-dropdown");
profileButton.addEventListener("click",function(){
    console.log("Time to go to profile.")
});


let createPostButton = document.querySelector("#submit");
createPostButton.addEventListener("click",function(){
    console.log("Creating Post.")
    let newPostSubreddit = document.querySelector("#subreddit-input")
    let newPostTitle = document.querySelector("#create-post-title")
    let newPostText = document.querySelector("#create-post-text");
    socket.emit("get_max_num_post") //emits a signal to backend to request the most recent post in db to get the post number so newly created post will have a post-num id after the most recent previous db entry
    socket.on("returned_max_num_post",function(data){
        let num = data["max_num"];
        // createNewPost(newPostText,"dartsams"); //subreddit,title,text,user,postedAgo
        let postNum = num;
        let subreddit = newPostSubreddit.value;
        let title = newPostTitle.value;
        let text = newPostText.value;
        let user = "dartsams";
        let postedAgo = "now";
        let likes = 0;
        // createNewPost(postNum,subreddit,title,text,user,postedAgo,likes)
        socket.emit("create_post",{"subreddit":subreddit,"title":title,"text":text,"user":user,"postedAgo":postedAgo,"likes":likes});
        document.querySelector("#subreddit-input").value = "";
        document.querySelector("#create-post-title").value = "";
        document.querySelector("#create-post-text").value = "";
        window.location = "/"
    })
})
