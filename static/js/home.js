const socket = io();
socket.on('connect', function() {
    console.log("socket connected")
    socket.emit('my event', {data: 'I\'m connected!'});
});

let logoButton = document.querySelector("#image-logo");
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
});

let profileButton = document.querySelector("#profile-dropdown");
profileButton.addEventListener("click",function(){
    console.log("Time to go to profile.")
});

let feedHome = document.querySelector("#feed-home");
feedHome.addEventListener("click",function(){
    console.log("Going to home page.")
});

let popularHome = document.querySelector("#feed-popular");
popularHome.addEventListener("click",function(){
    console.log("Going to the popular page.")
});

let registerButton = document.querySelector("#register-button");
registerButton.addEventListener("click",function(){
    console.log("Time to register.")
});

let createPostButton = document.querySelector("#create-post");
createPostButton.addEventListener("click",function(){
    console.log("Creating Post.")
    let newPostText = document.querySelector("#create-new-post").value;
    socket.emit("create_post",{"post":0,"text":newPostText});
    createNewPost(newPostText,"dartsams");
})


let postLink = document.querySelector("#post-body");
postLink.addEventListener("click",function(){
    console.log("Going to post page.")
    getPostData()
})

function getPostData(){
    console.log("getting post data.")
    let clickedPost = document.querySelector(".post-card-container")
    console.log(clickedPost.getAttribute("value"))
}

let likePostButton = document.querySelector("#like-post");
likePostButton.addEventListener("click",function(){
    let postValue = likePostButton.getAttribute("value")
    console.log("liking post.")
    console.log(postValue)
    if (likePostButton.src.includes("dark") === false) { // if the image src doesnt have dark in it then it will change that src to the dark image version
        likePostButton.src = "static/assets/like-dark.png"
    } else { // if the image src does have dark in it then it will change the src to the light image version
        likePostButton.src = "static/assets/like-light.png"
    } // when liking a post changes the image to a dark to show it has been liked 
    
    socket.emit("like_post",{"post":0,"posted_by":"Dartsams"})
});

let dislikePostButton = document.querySelector("#dislike-post");
dislikePostButton.addEventListener("click",function(){
    let postValue = dislikePostButton.getAttribute("value")
    console.log("Disliking post.")
    console.log(postValue)
    if (dislikePostButton.src.includes("dark") === false) { // if the image src doesnt have dark in it then it will change that src to the dark image version
        dislikePostButton.src = "static/assets/dislike-dark.png"
    } else { // if the image src does have dark in it then it will change the src to the light image version
        dislikePostButton.src = "static/assets/dislike-light.png"
    } // when dislike a post changes the image to a dark to show it has been disliked 
});

let subRedditLink = document.querySelector("#subreddit");
subRedditLink.addEventListener("click",function(){
    let subredditLinkName = subRedditLink.getAttribute("value")
    console.log("Going to subreddit.")
    console.log(subredditLinkName)
});

let posterLink = document.querySelector("#posted-by");
posterLink.addEventListener("click",function(){
    let posterLinkName = posterLink.getAttribute("value")
    console.log("Going to post creator page.")
    console.log(posterLinkName)
});

let subredditJoinButton = document.querySelector("#join-subreddit");
subredditJoinButton.addEventListener("click",function(){
    let subredditJoinButton = subRedditLink.getAttribute("value")
    console.log("joining subreddit.")
    console.log(subredditJoinButton)
});

let postCommentButton = document.querySelector("#comments");
postCommentButton.addEventListener("click",function(){
    console.log("Checking post comments.")
});

let postShareButton = document.querySelector("#share");
postShareButton.addEventListener("click",function(){
    console.log("Sharing post.")
});

let postSaveButton = document.querySelector("#save");
postSaveButton.addEventListener("click",function(){
    console.log("Saving post.")
    if (postSaveButton.firstChild.src.includes("dark") === false) { // if the image src doesnt have dark in it then it will change that src to the dark image version
        postSaveButton.firstChild.src = "static/assets/save-dark.png"
    } else { // if the image src does have dark in it then it will change the src to the light image version
        postSaveButton.firstChild.src = "static/assets/save-light.png"
    } // when saving a post changes the image to a dark to show it has been saved 
    
})

function createNewPost(text,user){
    let postContainer = document.querySelector("#post-container");
    let newPostDiv = document.createElement("div");
    newPostDiv.classList.add("post-card-container"); // adds a class to the div
    newPostDiv.classList.add("post-selections");
    // console.log(newPostDiv)
    
    createLikeUnlikeDiv(newPostDiv);
    createPost(newPostDiv,"adminTest",text,user,"3 hours ago");
    postContainer.append(newPostDiv)
}

function createLikeUnlikeDiv(parentNode){
    let likeUnlikeDiv = document.createElement("div");
    likeUnlikeDiv.className = "like-unlike";
    let likeButtonDiv = document.createElement("div");
    let likeImage = document.createElement("img");
    likeImage.src = "static/assets/like-light.png"
    likeImage.id = "like-post"
    let currentLikeAmount = document.createElement("div");
    currentLikeAmount.innerText = 69;
    let dislikeImage = document.createElement("img");
    dislikeImage.src = "static/assets/dislike-light.png"
    dislikeImage.id = "dislike-post"

    likeButtonDiv.append(likeImage)
    likeButtonDiv.append(currentLikeAmount)
    likeButtonDiv.append(dislikeImage)
    likeUnlikeDiv.append(likeButtonDiv)
    parentNode.append(likeUnlikeDiv)
}; //function to create like and unlike sidebar to a post

function createPost(parentNode,subreddit,text,user,postedAgo){
    let postDiv = document.createElement("div");
    postDiv.id = "post";
    let postHeaderDiv = document.createElement("div");
    postHeaderDiv.id = "post-header";

    //Left
    let postHeaderLeftDiv = document.createElement("div");
    postHeaderLeftDiv.id = "post-header-left";
    let postSubreddit = document.createElement("div");
    postSubreddit.classList.add("post-selector");
    postSubreddit.id = "subreddit"
    postSubreddit.innerText = "r/" + subreddit
    postSubreddit.value = subreddit
    let postedByDiv = document.createElement("div");
    postedByDiv.value = user;
    postedByDiv.id = "posted-by"
    postedByDiv.innerText = "posted by u/" + user;
    let postedAgoDiv = document.createElement("div");
    postedAgoDiv.id = "posted-time-ago";
    postedAgoDiv.innerText = postedAgo

    //Right
    let postHeaderRightDiv = document.createElement("div");
    postHeaderRightDiv.id = "post-header-right";
    let joinSubredditButtonDiv = document.createElement("div");
    joinSubredditButtonDiv.id = "join-subreddit";
    joinSubredditButtonDiv.value = subreddit;
    let joinSubredditButton = document.createElement("button");
    joinSubredditButton.classList.add("post-selector");
    joinSubredditButton.innerText = "Join"

    postHeaderLeftDiv.append(postSubreddit)
    postHeaderLeftDiv.append(postedByDiv)
    postHeaderLeftDiv.append(postedAgoDiv)
    joinSubredditButtonDiv.append(joinSubredditButton)
    postHeaderRightDiv.append(joinSubredditButtonDiv)
    postHeaderDiv.append(postHeaderLeftDiv)
    postHeaderDiv.append(postHeaderRightDiv)
    postDiv.append(postHeaderDiv)
    parentNode.append(postDiv)
}