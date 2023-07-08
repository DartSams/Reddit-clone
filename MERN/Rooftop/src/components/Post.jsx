import "../css/Post.css"
function Post (data) {
    return (
        <div>
            <div className="post-header">
                <div className="settings-button-container">
                    <div id="block"></div>
                    <div id="block"></div>
                    <div id="block"></div>
                </div>
            </div>

            <div className="post-body">
                <h1>Title</h1>
                <h3>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque ipsam omnis quam mollitia exercitationem facilis nihil tempore totam obcaecati eligendi.</h3>
            </div>

            <div className="post-footer">
                <div className="like-unlike-container">
                    <button>upvote</button>
                    <button>downvote</button>
                </div>
                <button>comments</button>
                <button>share</button>
            </div>
        </div>
    )
}

export default Post;