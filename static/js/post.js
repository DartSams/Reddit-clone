function createNewPost(postNum,subreddit,title,text,user,postedAgo){
    let postContainer = document.querySelector("#post-container");
    let newPostDiv = document.createElement("div");
    newPostDiv.classList.add("post-card-container"); // adds a class to the div
    newPostDiv.classList.add("post-selections");
    // console.log(newPostDiv)
    
    createLikeUnlikeDiv(newPostDiv,postNum);
    createPostDiv(newPostDiv,subreddit,title,text,user,postedAgo);
    // socket.emit("create_post",{"post":postNum,"subreddit":subreddit,"title":title,"text":text,"user":user,"postedAgo":postedAgo});
    postContainer.append(newPostDiv)
}