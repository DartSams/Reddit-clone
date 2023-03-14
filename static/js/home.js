let socket = io();
socket.on('connect', function() {
    console.log("socket connected")
    socket.emit('my event', {data: 'I\'m connected!'});
    console.log(sessionStorage.getItem("username"))
    if (sessionStorage.getItem("username")) {
        let navbarRight = document.querySelector("#navbar-right-container")
        let profileContainer = document.createElement("div")
        profileContainer.id = "profile-dropdown-container"
        let profileButton = document.createElement("button")
        profileButton.id = "profile-dropdown"
        profileButton.className = "selector"
        profileButton.innerText = "Profile"
        profileButton.addEventListener("click",function(){
            console.log("Time to go to profile.")
            // window.location = "/profile"
            socket.emit("profile",{"username":sessionStorage.getItem("username")})
        })

        profileContainer.append(profileButton)
        navbarRight.append(profileContainer)
        let registerButtonDiv = document.querySelector("#feed-container")
        registerButtonDiv.removeChild(registerButtonDiv.lastElementChild);
    }
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

// let profileButton = document.querySelector("#profile-dropdown");
// profileButton.addEventListener("click",function(){
//     console.log("Time to go to profile.")
// });

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
    openPopup()
    loginDiv()
});

let newPostText = document.querySelector("#create-new-post");
    newPostText.addEventListener("click",function(){
    window.location = "/create_post"
})

let createPostButton = document.querySelector("#create-post");
createPostButton.addEventListener("click",function(){
    console.log("Creating Post.")
    let newPostText = document.querySelector("#create-new-post");
    newPostText.addEventListener("click",function(){
        window.location = "/create_post"
    })
    socket.emit("get_max_num_post") //emits a signal to backend to request the most recent post in db to get the post number so newly created post will have a post-num id after the most recent previous db entry
    socket.on("returned_max_num_post",function(data){
        let num = data["max_num"];
        // createNewPost(newPostText,"dartsams"); //subreddit,title,text,user,postedAgo
        let postNum = num;
        let subreddit = "adminTest";
        let title = "first post test";
        let text = newPostText.value;
        let user = "dartsams";
        let postedAgo = "now";
        let likes = 0;
        createNewPost(postNum,subreddit,title,text,user,postedAgo,likes)
        socket.emit("create_post",{"subreddit":subreddit,"title":title,"text":text,"user":user,"postedAgo":postedAgo,"likes":likes});
        document.querySelector("#create-new-post").value = "";
    })
})


// let postLink = document.querySelector("#post-body");
// postLink.addEventListener("click",function(){
//     console.log("Going to post page.")
//     getPostData()
// })

function getPostData(){
    console.log("getting post data.")
    let clickedPost = document.querySelector(".post-card-container")
    console.log(clickedPost.getAttribute("id"))
}



// let likePostButton = document.querySelector("#like-post");
// likePostButton.addEventListener("click",function(){
//     let postValue = likePostButton.getAttribute("value")
//     console.log("liking post.")
//     console.log(postValue)
//     if (likePostButton.src.includes("dark") === false) { // if the image src doesnt have dark in it then it will change that src to the dark image version
//         likePostButton.src = "static/assets/like-dark.png"
//     } else { // if the image src does have dark in it then it will change the src to the light image version
//         likePostButton.src = "static/assets/like-light.png"
//     } // when liking a post changes the image to a dark to show it has been liked 
    
//     socket.emit("like_post",{"post":0,"posted_by":"Dartsams"})
// });

// let dislikePostButton = document.querySelector("#dislike-post");
// dislikePostButton.addEventListener("click",function(){
//     let postValue = dislikePostButton.getAttribute("value")
//     console.log("Disliking post.")
//     console.log(postValue)
//     if (dislikePostButton.src.includes("dark") === false) { // if the image src doesnt have dark in it then it will change that src to the dark image version
//         dislikePostButton.src = "static/assets/dislike-dark.png"
//     } else { // if the image src does have dark in it then it will change the src to the light image version
//         dislikePostButton.src = "static/assets/dislike-light.png"
//     } // when dislike a post changes the image to a dark to show it has been disliked 
// });

// let subRedditLink = document.querySelector("#subreddit");
// subRedditLink.addEventListener("click",function(){
//     let subredditLinkName = subRedditLink.getAttribute("value")
//     console.log("Going to subreddit.")
//     console.log(subredditLinkName)
// });

// let posterLink = document.querySelector("#posted-by");
// posterLink.addEventListener("click",function(){
//     let posterLinkName = posterLink.getAttribute("value")
//     console.log("Going to post creator page.")
//     console.log(posterLinkName)
// });

// let subredditJoinButton = document.querySelector("#join-subreddit");
// subredditJoinButton.addEventListener("click",function(){
//     let subredditJoinButton = subRedditLink.getAttribute("value")
//     console.log("joining subreddit.")
//     console.log(subredditJoinButton)
// });

// let postCommentButton = document.querySelector("#comments");
// postCommentButton.addEventListener("click",function(){
//     console.log("Checking post comments.")
// });

// let postShareButton = document.querySelector("#share");
// postShareButton.addEventListener("click",function(){
//     console.log("Sharing post.")
// });

// let postSaveButton = document.querySelector("#save");
// postSaveButton.addEventListener("click",function(){
//     console.log("Saving post.")
//     if (postSaveButton.firstChild.src.includes("dark") === false) { // if the image src doesnt have dark in it then it will change that src to the dark image version
//         postSaveButton.firstChild.src = "static/assets/save-dark.png"
//     } else { // if the image src does have dark in it then it will change the src to the light image version
//         postSaveButton.firstChild.src = "static/assets/save-light.png"
//     } // when saving a post changes the image to a dark to show it has been saved 
    
// })

function createNewPost(postNum,subreddit,title,text,user,postedAgo,likesNum=0){
    let postContainer = document.querySelector("#post-container");
    let newPostDiv = document.createElement("div");
    newPostDiv.classList.add("post-card-container"); // adds a class to the div
    newPostDiv.classList.add("post-selections");
    newPostDiv.id = postNum
    // console.log(newPostDiv)
    
    createLikeUnlikeDiv(newPostDiv,postNum,likesNum);
    createPostDiv(newPostDiv,subreddit,title,text,user,postedAgo);
    // socket.emit("create_post",{"post":postNum,"subreddit":subreddit,"title":title,"text":text,"user":user,"postedAgo":postedAgo});
    postContainer.prepend(newPostDiv) //appends new post div to the top of the list
}

function createLikeUnlikeDiv(parentNode,postNum,likesNum){
    let likeUnlikeDiv = document.createElement("div");
    likeUnlikeDiv.className = "like-unlike";
    let likeButtonDiv = document.createElement("div");
    let likeImage = document.createElement("img");
    likeImage.src = "static/assets/like-light.png";
    likeImage.id = "like-post";
    // likeButtonDiv.value = postNum
    let currentLikeAmount = document.createElement("div");
    currentLikeAmount.innerText = likesNum;
    likeImage.addEventListener("click",function(){
        // let postValue = likeButtonDiv.getAttribute("value")
        console.log("liking post.")
        // console.log(postNum)
        let likeAmount = parseInt(currentLikeAmount.innerText)
        if (likeImage.src.includes("dark") === false) { // if the image src doesnt have dark in it then it will change that src to the dark image version
            likeImage.src = "static/assets/like-dark.png";
            dislikeImage.src = "static/assets/dislike-light.png"; //if dislike button is already switched on then user decides to like post instead this will switch dislike off
            currentLikeAmount.innerText = likeAmount + 1; //increments the like amount for that post
        } else { // if the image src does have dark in it then it will change the src to the light image version
            likeImage.src = "static/assets/like-light.png";
            currentLikeAmount.innerText = likeAmount - 1;//decrements the like amount for that post
        } // when liking a post changes the image to a dark to show it has been liked 
        socket.emit("like_post",{"post":postNum,"posted_by":"Dartsams","likes":parseInt(currentLikeAmount.innerText)}) //emits a signal to backend saying post was liked to update in db
    })
    let dislikeImage = document.createElement("img");
    dislikeImage.src = "static/assets/dislike-light.png";
    dislikeImage.id = "dislike-post";
    dislikeImage.addEventListener("click",function(){
        console.log("Disliking post.")
        console.log(postNum)
        let likeAmount = parseInt(currentLikeAmount.innerText)
        if (dislikeImage.src.includes("dark") === false) { // if the image src doesnt have dark in it then it will change that src to the dark image version
            dislikeImage.src = "static/assets/dislike-dark.png";
            likeImage.src = "static/assets/like-light.png"; //if like button is already switched on then user decides to dislike post instead this will switch dislike on
            currentLikeAmount.innerText = likeAmount - 1;
        } else { // if the image src does have dark in it then it will change the src to the light image version
            dislikeImage.src = "static/assets/dislike-light.png"; 
            currentLikeAmount.innerText = likeAmount + 1;
        } // when dislike a post changes the image to a dark to show it has been disliked
        socket.emit("dislike_post",{"post":postNum,"posted_by":"Dartsams","likes":parseInt(currentLikeAmount.innerText)}) //emits a signal to backend saying post was disliked to update in db 
    })

    likeButtonDiv.append(likeImage)
    likeButtonDiv.append(currentLikeAmount)
    likeButtonDiv.append(dislikeImage)
    likeUnlikeDiv.append(likeButtonDiv)
    parentNode.append(likeUnlikeDiv)
}; //function to create like and unlike sidebar to a post

function createPostDiv(parentNode,subreddit,title,text,user,postedAgo){
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
    postSubreddit.addEventListener("click",function(){
        // let subredditLinkName = postSubreddit.getAttribute("value")
        console.log("Going to subreddit.")
        console.log(subreddit)
    })
    let postedByDiv = document.createElement("div");
    postedByDiv.value = user;
    postedByDiv.id = "posted-by"
    postedByDiv.className = "post-selector"
    postedByDiv.innerText = "posted by u/" + user;
    postedByDiv.addEventListener("click",function(){
        // let posterLinkName = posterLink.getAttribute("value")
        console.log("Going to post creator page.")
        console.log(user)
    })
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
    joinSubredditButton.innerText = "Join";
    joinSubredditButton.addEventListener("click",function(){
        // let subredditJoinButton = subRedditLink.getAttribute("value")
        console.log("joining subreddit.")
        console.log(subreddit)
        socket.emit("join_subreddit",{"username":sessionStorage.getItem("username"),"subreddit":subreddit})
    })

    //body
    let postBodyDiv = document.createElement("div");
    postBodyDiv.id = "post-body";
    postBodyDiv.addEventListener("click",function(){
        console.log("Going to post page.")
        getPostData()
    })
    let postTitleDiv = document.createElement("div");
    postTitleDiv.id = "post-title";
    let postTitle = document.createElement("h2");
    postTitle.innerText = title;
    let postContextDiv = document.createElement("div");
    postContextDiv.id = "post-text-content"
    let postContext = document.createElement("p");
    postContext.innerText = text;

    //footer
    let postFooterDiv = document.createElement("div");
    postFooterDiv.id = "post-footer";
    let postCommentDiv = document.createElement("div");
    postCommentDiv.id = "comments";
    let postCommentImage = document.createElement("img");
    postCommentImage.src = "static/assets/comment-light.png"
    postCommentDiv.addEventListener("click",function(){
        console.log("Checking post comments.")
    })
    let postShareDiv = document.createElement("div");
    postShareDiv.id = "share";
    let postShareImage = document.createElement("img");
    postShareImage.src = "static/assets/share-light.png";
    postShareDiv.addEventListener("click",function(){
        console.log("Sharing post.")
    })
    let postSaveDiv = document.createElement("div");
    postSaveDiv.id = "save";
    let postSaveImage = document.createElement("img");
    postSaveImage.src = "static/assets/save-light.png";
    postSaveDiv.addEventListener("click",function(){
        console.log("Saving post.")
        if (postSaveImage.src.includes("dark") === false) { // if the image src doesnt have dark in it then it will change that src to the dark image version
            postSaveImage.src = "static/assets/save-dark.png";
        } else { // if the image src does have dark in it then it will change the src to the light image version
            postSaveImage.src = "static/assets/save-light.png";
        } // when saving a post changes the image to a dark to show it has been saved 

    })

    postFooterDiv.append(postCommentDiv)
    postFooterDiv.append(postShareDiv)
    postFooterDiv.append(postSaveDiv)
    postCommentDiv.append(postCommentImage)
    postShareDiv.append(postShareImage)
    postSaveDiv.append(postSaveImage)

    postHeaderLeftDiv.append(postSubreddit)
    postHeaderLeftDiv.append(postedByDiv)
    postHeaderLeftDiv.append(postedAgoDiv)
    joinSubredditButtonDiv.append(joinSubredditButton)
    postHeaderRightDiv.append(joinSubredditButtonDiv)
    postHeaderDiv.append(postHeaderLeftDiv)
    postHeaderDiv.append(postHeaderRightDiv)
    postDiv.append(postHeaderDiv)

    postTitleDiv.append(postTitle)
    postBodyDiv.append(postTitleDiv)
    postBodyDiv.append(postContextDiv)
    postContextDiv.append(postContext)
    postDiv.append(postBodyDiv)
    parentNode.append(postDiv)

    postDiv.append(postFooterDiv)
}

function openPopup () {
    let popupContainer = document.getElementById("popup-container")
    popupContainer.style.display = "flex";
}

function closePopup () {
    let popupContainer = document.getElementById("popup-container")
    popupContainer.style.display = "none";
    let popupDiv = document.querySelector(".popup");
    popupDiv.innerHTML = "";
}


function loginDiv(title,emailElement,usernameElement,passwordElement){
    let popupDiv = document.querySelector(".popup");
    let popupHeader = document.createElement("div");
    popupHeader.className = "popup-header";
    let closePopupButton = document.createElement("button")
    closePopupButton.innerText = "X"
    closePopupButton.addEventListener("click",closePopup)

    let popupBody = document.createElement("div");
    popupBody.className = "popup-body";
    let popupTitle = document.createElement("h1");
    popupTitle.innerText = "Login";
    let usernamePopupInput = document.createElement("input");
    usernamePopupInput.placeholder = "Username...";
    let passwordPopupInput = document.createElement("input");
    passwordPopupInput.type = "password";
    passwordPopupInput.placeholder = "Password";

    let popupFooter = document.createElement("div");
    popupFooter.className = "popup-footer";
    let loginButton = document.createElement("button")
    loginButton.className = "selector";
    loginButton.innerText = "Login";
    loginButton.addEventListener("click",function(){
        console.log("Logging in")
        socket.emit("login",{"username":usernamePopupInput.value,"password":passwordPopupInput.value})
        closePopup()
    })

    let registerButton = document.createElement("button");
    registerButton.href = "/register";
    registerButton.innerText = "Register";
    registerButton.className = "selector";
    registerButton.addEventListener("click",function(){
        console.log("Registering account")
        socket.emit("register",{"username":usernamePopupInput.value,"password":passwordPopupInput.value})
        closePopup()
    })

    popupDiv.append(popupHeader)
    popupDiv.append(popupBody)
    popupDiv.append(popupFooter)
    popupHeader.append(closePopupButton)
    popupBody.append(usernamePopupInput)
    popupBody.append(passwordPopupInput) 
    popupBody.append(popupTitle)
    popupFooter.append(loginButton)
    popupFooter.append(registerButton)

}


socket.on("found_user", function(data) {
    console.log(data)
    sessionStorage.setItem("username", data["username"]);
    console.log(sessionStorage.getItem("username"))
    let navbarRight = document.querySelector("#navbar-right-container")
    let profileContainer = document.createElement("div")
    profileContainer.id = "profile-dropdown-container"
    let profileButton = document.createElement("button")
    profileButton.id = "profile-dropdown"
    profileButton.className = "selector"
    profileButton.innerText = "Profile"
    profileButton.addEventListener("click",function(){
        console.log("Time to go to profile.")
    })

    profileContainer.append(profileButton)
    navbarRight.append(profileContainer)
});


// Remove saved data from sessionStorage 
// sessionStorage.removeItem("key"); <- use this later for user logout