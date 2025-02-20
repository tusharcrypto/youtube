import "../CSS/Vedio.css";
import jack from "../assets/Images/jack.png";
import like from "../assets/Images/like.png";
import dislike from "../assets/Images/dislike.png";
import save from "../assets/Images/save.png";
import share from "../assets/Images/share.png";
import { useParams } from "react-router";
import { useContext, useEffect, useState } from "react";
import more from "../assets/Images/more.png";
import { AuthContext } from "../../Utility/AuthContex";
const Vedio = () => {
  const { videoid } = useParams();
  const id = videoid || "67a4c687b1975d05c67a518c";
  const [video, setVideo] = useState(null);
  const [sub, setSubs] = useState(0);
  const [likecnt, setLike] = useState(0);
  const [comment, setComment] = useState("");
  const [commetID, setCommetID] = useState("");
  const[substatus,setSubstatus] = useState();
  const [commentEditIndex, setCommentEditIndex] = useState(null);
  const {editflag, seteditflag} = useContext(AuthContext)
   let uri='https://youtubebackend-rlno.onrender.com'
  let user = localStorage.getItem("User");
  user = JSON.parse(user);

  //get video by id
  async function getVedioById() {
    try {
      const response = await fetch(`${uri}/api/video/${id}`);
      if (!response.ok) throw new Error("Failed to fetch video");

      const vid = await response.json();
      console.log(vid.channel.issubscribed);
      setVideo(vid);
      setLike(vid.likeCount);
      setSubs(vid.channel.subscribercount);
      setSubstatus(vid.channel.issubscribed)
    } catch (error) {
      console.error(error);
    }
  }

  //handlesubscriber
  async function handleSubscriber() {
    try {
      const response = await fetch(
        `${uri}api/updatesubsciber`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: video.channel._id }),
        }
      );

      if (!response.ok) throw new Error("Subscription update failed");

      const data = await response.json();
      setSubs(data.subcnt);
      setSubstatus(data.issub)
      console.log("Subscriber updated", data);
    } catch (error) {
      console.error(error);
    }
  }

  //handle videolike
  async function handleVideoLike() {
    try {
      const response = await fetch(
        `${uri}/api/updatelikebyvedio`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: videoid, like: true }),
        }
      );

      if (!response.ok) throw new Error("Like update failed");

      setLike(likecnt + 1);
    } catch (error) {
      console.error(error);
    }
  }

  //handle videodislike
  async function handleVideoDislike() {
    try {
      const response = await fetch(
        `${uri}/api/updatelikebyvedio`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: videoid, like: false }),
        }
      );

      if (!response.ok) throw new Error("Dislike update failed");

      setLike(likecnt - 1);
    } catch (error) {
      console.error(error);
    }
  }
  //commet edit
  async function handleedits(index, username) {
    if (username == user.username) {
      setCommentEditIndex(commentEditIndex === index ? null : index);
    }
  }

  //submitcomment
  async function submitcomment() {
      try {
        let user = localStorage.getItem("User");
        user = JSON.parse(user);
        const response = await fetch(`${uri}/api/addcomment`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: user.username,
            comment: comment,
            videoId: video._id,
          }),
        });
        if (!response.ok) {
          console.log("comment fail to add");
        }
        console.log("commet added");
        seteditflag(true);
        setComment("");
      } catch (error) {
        console.log(error);
      }
    
  }

  // Edit comment
   async function handleeditCommet() {
    console.log(commetID, comment);
    setCommentEditIndex(commetID);
    try {
      const response = await fetch(
        `${uri}/api/updatecomment`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            commentId: commetID,
            updatedComment: comment,
          }),
        }
      );

      if (!response.ok) {
        console.log("Failed to update comment");
        return;
      }
      setComment("");
      const data = await response.json();
      console.log("Comment updated", data);

      await getVedioById();

      setCommentEditIndex(null);
    } catch (error) {
      console.error(error);
    }
    
  }



  // Delete comment
  async function handledeletComment(commentid) {
    try {
      const response = await fetch(`${uri}/api/deletecomment`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ commentId: commentid }),
      });

      if (!response.ok) {
        console.log("Failed to delete comment");
        return;
      }

      console.log("Comment deleted");
      // Re-fetch or update the comments in state after deletion
      getVedioById(); // This will refresh the video comments
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    getVedioById();
  }, [id]);

  if (!video) return <p>Loading...</p>;
  return (
    <div className="vedio">
      <div className="vedio-container">
        <iframe
          src={`https://www.youtube.com/embed/${video.videoId}`}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>

      <h3>{video.title}</h3>
      <div className="vedio-info flex-div">
        <div className="channel-ownner flex-div">
          <img src={jack} className="profile"></img>
          <span>
            <p>{video.channel.channelName}</p>
            <p>{sub} subscribers</p>
          </span>
          <button className="jion">Join</button>
          {substatus?(
            <button className="subscribe" style={{background:"black",color:"white"}} onClick={handleSubscriber}>
              Subscribed
            </button>
          ) : (
            <button className="subscribe" onClick={handleSubscriber}>
              Subscribe
            </button>
          )}
        </div>

        <div className="share-save flex-div">
          <div className="like-dislike flex-div">
            <img src={like} onClick={handleVideoLike}></img>
            <p>{likecnt}</p>
            <img src={dislike} onClick={handleVideoDislike}></img>
          </div>
          <span className="share flex-div">
            <img src={share}></img>Share
          </span>
          <span className="save flex-div">
            <img src={save}></img>Save
          </span>
        </div>
      </div>
      <div className="vedio-description">
        <p>{Math.round(video.viewCount)} views 10 months ago</p>
        <p>{video.description}</p>
      </div>
      <div className="comments">
        <div className="add-comment">
          <img src={jack} className="profile"></img>
          <span>
            <input
              type="text"
              placeholder="Add the commet"
              value={comment}
              onChange={(e) => {
                setComment(e.target.value);
              }}
            ></input>
            {editflag ?<button onClick={submitcomment}>Add comment</button>:<button onClick={handleeditCommet}>Edit comment</button>}
          </span>
          <div>
            {video.comments.length === 0 ? (
              <div className="user-comment flex-div">
                <img src={jack} className="profile" alt="profile" />
                <div className="user-info">
                  <p>tusharwankhede 11 months ago</p>
                  <p>It was a nice, informative video</p>
                  <div className="comment-like flex-div">
                    <img src={like} alt="like" />
                    <p>15k</p>
                    <img src={dislike} alt="dislike" />
                  </div>
                </div>
              </div>
            ) : (
              video.comments.map((comment, index) => (
                <div className="user-comment flex-div" key={index}>
                  <img src={jack} className="profile" alt="profile" />
                  <div className="user-info">
                    <p>{comment.username} 1 day ago</p>

                    <div className="more">
                      {commentEditIndex === index ? (
                        <div className="more-options">
                          <p
                            onClick={() => {
                             setComment(comment.comment);
                             setCommentEditIndex(null)
                             seteditflag(false);
                             setCommetID(comment._id)
                            }}
                          >
                            Edit
                          </p>
                          <p
                            onClick={() => {
                              handledeletComment(comment._id);
                            }}
                          >
                            Delete
                          </p>
                        </div>
                      ) : (
                        <img
                          src={more}
                          alt="more"
                          onClick={() => {
                            handleedits(index, comment.username);
                          }}
                        />
                      )}
                    </div>

                    <p className="comment">{comment.comment}</p>

                    <div className="comment-like flex-div">
                      <img src={like} alt="like" />
                      <p>{comment.commentslikecount}</p>
                      <img src={dislike} alt="dislike" />
                    </div>
                  </div>
                </div>
                
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Vedio;
