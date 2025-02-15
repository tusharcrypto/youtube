import { useEffect, useState } from "react";
import "../CSS/ChannelPage.css";
import bg1 from "../assets/Images/bg1.png";
import jack from "../assets/Images/jack.png";
import plus from "../assets/Images/plus.png";
import VideoUplaodForm from "./VideoUplaodForm";
import {useNavigate, useParams } from "react-router-dom";
import more from '../assets/Images/more.png'
import bin from '../assets/Images/delete.png'
const ChannelPage = () => {
  const [popform, setpop] = useState(false);
  const [channeldata, setchanneldata] = useState([]);
  const [chanelinfo, setchannel] = useState([]);
  const { id } = useParams();
  const [sub, setSubs] = useState(0);
  const [substatus, setsubstatus] = useState();
  const navigate = useNavigate();
  const [editform,setEditform] = useState(false);
  const [editedTitle,setEditTitle] = useState("");
  const [editedDesp,setEditedDesp] = useState("");
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

      const response = await fetch(
        `http://localhost:4000/api/channels/${user._id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        console.error("Channel is not created");
        return;
      }

      const data = await response.json();
      const filterchannel = data.filter((video) => video._id == id);
      setEditTitle(filterchannel[0].channelName)
      setEditedDesp(filterchannel[0].description)
      setsubstatus(filterchannel[0].issubscribed);
      setchannel(filterchannel);
      setSubs(filterchannel[0].subscribercount);
      
    } catch (error) {
      console.error("No channels found", error);
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
      setSubs(data[0].channel.subscribercount);
      // console.log("Fetched Videos:", data[0]);
    } catch (error) {
      console.log("Error fetching channel videos:", error);
    }
  }
  // console.log(id)
  async function handleSubscriber() {
    try {
      const response = await fetch(
        "http://localhost:4000/api/updatesubsciber",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: id }),
        }
      );

      if (!response.ok) throw new Error("Subscription update failed");

      const data = await response.json();
      setSubs(data.subcnt);
      setsubstatus(!substatus);
      console.log("Subscriber updated", data);
    } catch (error) {
      console.error(error);
    }
  }
  async function handleview(id) {
    try {
      console.log(id)
      const response = await fetch('http://localhost:4000/api/updateview',{
        method:'PUT',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({id:id}),
      })
      if(!response.ok){
        console.log("something wnet wrong")
      }
      const data = await response.json();
      console.log(data)
    } catch (error) {
      console.log(error)
    }
    
   }
   //video page
   function handlePlayvideo(id){
    navigate(`/vedio/${id}`)
   }

  // delete video 
  async function handleDeleteVideo(id) {
    try {
       const response = await fetch(`http://localhost:4000/api/deletevediobychannel`,{
        method:'DELETE',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify({channelID:chanelinfo[0]._id,videoID:id})
       })
       if(!response.ok){
        alert("Failed to delete")
       }
      //  alert("Video deleted Successfully")
    } catch (error) {
       console.log(error)
    }
    
  } 
//channel edit 
async function handleChanneledit(e) {
  e.preventDefault()
    try {
      console.log(editedTitle,editedDesp)
      const response = await fetch(`http://localhost:4000/api/updateChannelifo`,{
        method:'PUT',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify({channelID:chanelinfo[0]._id,updatedtitle:editedTitle,updateddesp:editedDesp})
      })
      if(!response.ok){
        alert('Failed To edit channel-Infomation')
      }
      else{
        setEditform(false)
        getchannel();
        channelvideo();
      }
    } catch (error) {
      console.log(error)
    }
}
  useEffect(() => {
    getchannel();
    channelvideo();
  }, [id]);

  if (!chanelinfo.length) return <p>Loading...</p>;
  // console.log(sub)
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
          <p>{chanelinfo[0].description}</p>
          <p>
            {sub} Subscribers • {channeldata.length} Videos
          </p>
        </div>
        {substatus ? (
          <button
            onClick={handleSubscriber}
            className="subscribe-btn"
            style={{ backgroundColor: "black" }}
          >
            Subscribed
          </button>
        ) : (
          <button onClick={handleSubscriber} className="subscribe-btn">
            Subscribe
          </button>
        )}

        <div className="create-channel" onClick={handlepop}>
          <img src={plus} alt="Create Channel" />
          <p>Upload Video</p>
          
        </div>
        <img src={more} className="editoption" onClick={()=>{setEditform(true)}}></img>
      </div>

      <hr />

      <div className="video-container">
        <p className="video-title">Videos</p>
        <div className="videos">
          {channeldata.map((video, index) => (
            <div
              className="video-card"
              key={index}
                >
              {/* {console.log(video)} */}
              <img
                src={video.thumbnailUrl}
                alt="Video Thumbnail"
                className="video-thumbnail"
                onClick={()=>{
                  handleview(video._id)
                  handlePlayvideo(video._id)
                }}
              />
              <div className="video-info">
                <h3 className="video-title">{video.title}</h3>
                {/* <p>{video.channel.channelName}</p> */}
                <div className="editdelete">
                <p className="video-stats">
                  {video.viewCount} views • 1 days ago
                </p>
                <img src={bin} className="option" onClick={()=>{
                  handleDeleteVideo(video._id)
                }}></img>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {editform?
        <div className="edit-form">
          <form onSubmit={handleChanneledit}>
            <h3>Update Channel Info</h3>
            <label htmlFor="title">Channel Name</label>
            <input type="text" placeholder="Enter the channel name" required value={editedTitle} onChange={(e)=>{
              setEditTitle(e.target.value)
            }}></input>
            <label htmlFor="title" >Description</label>
            <input type="text" placeholder="Description" required value={editedDesp} onChange={(e)=>{
              setEditedDesp(e.target.value)
            }}></input>
            <input type="Submit" className="editbtn"></input>
          </form>
        </div>:
       "" 
      }
      {popform && (
        <div className="pop-form-overlay">
          <div className="pop-form">
            <VideoUplaodForm handlepop={handlepop} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ChannelPage;
