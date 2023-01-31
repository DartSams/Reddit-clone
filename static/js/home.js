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

let postLink = document.querySelector("#post-body");
postLink.addEventListener("click",function(){
    console.log("Going to post page.")
})

let likePostButton = document.querySelector("#like-post");
likePostButton.addEventListener("click",function(){
    let postValue = likePostButton.getAttribute("value")
    console.log("liking post")
    console.log(postValue)
});

let dislikePostButton = document.querySelector("#dislike-post");
dislikePostButton.addEventListener("click",function(){
    let postValue = dislikePostButton.getAttribute("value")
    console.log("Disliking post")
    console.log(postValue)
});

let subRedditLink = document.querySelector("#subreddit");
subRedditLink.addEventListener("click",function(){
    let subredditLinkName = subRedditLink.getAttribute("value")
    console.log("Going to subreddit")
    console.log(subredditLinkName)
});

let posterLink = document.querySelector("#posted-by");
posterLink.addEventListener("click",function(){
    let posterLinkName = posterLink.getAttribute("value")
    console.log("Going to post creator page")
    console.log(posterLinkName)
});

let subredditJoinButton = document.querySelector("#join-subreddit");
subredditJoinButton.addEventListener("click",function(){
    let subredditJoinButton = subRedditLink.getAttribute("value")
    console.log("joining subreddit")
    console.log(subredditJoinButton)
});

