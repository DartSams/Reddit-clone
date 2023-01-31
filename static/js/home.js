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

function getPostData(){
    console.log("getting post data.")
    let clickedPost = document.querySelector(".post-card-container")
    console.log(clickedPost.getAttribute("value"))
}

let postLink = document.querySelector("#post-body");
postLink.addEventListener("click",function(){
    console.log("Going to post page.")
    getPostData()
})

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