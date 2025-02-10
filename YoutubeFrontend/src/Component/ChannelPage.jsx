import { useEffect, useState } from "react";
import "../CSS/ChannelPage.css";
import bg1 from "../assets/Images/bg1.png";
import jack from "../assets/Images/jack.png";
import plus from "../assets/Images/plus.png";
import VideoUplaodForm from "./VideoUplaodForm";
import { useParams } from "react-router-dom"; // ✅ Fixed Import

const ChannelPage = () => {
  const [popform, setpop] = useState(false);
  const [channeldata, setchanneldata] = useState([]); 
  const [chanelinfo, setchannel] = useState([]);
  const { id } = useParams(); 
   console.log(channeldata)
  function handlepop() {
    setpop(!popform);
  }
  async function getchannel() {
    try {
      let user = localStorage.getItem("User");
      if (!user) {
        console.error("No user found in localStorage");
        return;
      }
      user = JSON.parse(user);

      const response = await fetch(`http://localhost:4000/api/channels/${user._id}`, {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        console.error("Channel is not created");
        return;
      }

      const data = await response.json();
      const filterchannel = data.filter(video =>video._id == id)
      setchannel(filterchannel);
      console.log("Fetched channels:", filterchannel);
    } catch (error) {
      console.error('No channels found', error);
    }
  }

  async function channelvideo() {
    try {
      const response = await fetch(
        `http://localhost:4000/api/vediobychannel/${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        console.log("Channel not found");
        return;
      }

      const data = await response.json();
      setchanneldata(data);
      console.log("Fetched Videos:", data);
    } catch (error) {
      console.log("Error fetching channel videos:", error);
    }
  }

  useEffect(() => {
    channelvideo();
    getchannel();
  }, [id]); 

  if (!chanelinfo.length) return <p>Loading...</p>;

  return (
    <div className="channelpage">
      <div className="banner">
        <img src={bg1} alt="Channel Banner" />
      </div>
      <div className="logo-info">
        <div className="logo">
          <img src={jack} alt="Channel Logo" />
        </div>
        <div className="info">
          <h2>{chanelinfo[0].channelName || "No Channel Name"}</h2>
          <p>{chanelinfo[0].subscribercount} Subscribers • {channeldata.length} Videos</p>
        </div>
        <button className="subscribe-btn">Subscribe</button>

        <div className="create-channel" onClick={handlepop}>
          <img src={plus} alt="Create Channel" />
          <p>Upload Video</p>
        </div>
      </div>

      <hr />

      <div className="video-container">
        <p className="video-title">Videos</p>
        <div className="videos">
          {channeldata.map((video,index) => (
            <div className="video-card" key={index}> 
              <img
                src={video.thumbnailUrl}
                alt="Video Thumbnail"
                className="video-thumbnail"
              />
              <div className="video-info">
                <h3 className="video-title">{video.title}</h3>
                <p className="video-stats">
                  {video.viewCount} views • 1 days ago
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {popform && (
        <div className="pop-form-overlay">
          <div className="pop-form">
            <button className="close-btn" onClick={handlepop}>
              X
            </button>
            <VideoUplaodForm />
          </div>
        </div>
      )}
    </div>
  );
};

export default ChannelPage;
