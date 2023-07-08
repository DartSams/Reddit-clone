import "../css/Profile.css"
import Post from "../components/Post";

function Profile (data) {
    return (
        <div className="profile">
            <div className="profile-header">
                <div className="profile-header-center">
                    <img src="profile.jpg" alt="" className="profile-icon"/>
                    <h1 className="profile-header-center-align">u/{data.name}</h1>
                </div>
                <div className="profile-header-right">
                    <div>
                        <img src="edit.png" alt="" />
                    </div>
                    <div>
                        <img src="share.png" alt="" />
                    </div>
                    <div className="profile-settings-button-container profile-header-center-align">
                        <div id="block"></div>
                        <div id="block"></div>
                        <div id="block"></div>
                    </div>
                </div>
            </div>

            <div className="profile-background">
                <img src="logo.png" alt="" />
            </div>

            <div className="profile-title">
                <h1>{data.name}</h1>
                <p>{data.followerCount} Followers</p>
                <p>u/{data.name} - {data.points} - {data.joinDate}</p>
            </div>

            <div className="profile-socials">
                <button className="new-profile-social">Add social link</button>
            </div>

            <div className="profile-body">
                <div className="profile-body-header-tabs">
                    <button>Posts</button>
                    <button>Comments</button>
                    <button>About</button>
                </div>

                <div className="profile-toggle">
                    <button>Hot Post</button>
                </div>

                <div className="profile-posts-container">
                <div id="post">
                        <Post />
                    </div>
                    <div id="post">
                        <Post />
                    </div>
                    <div id="post">
                        <Post />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile;

