import "../CSS/VedioRecommendation.css";
import { Link } from "react-router";
import { useState,useEffect } from "react";
import { useParams } from "react-router";
const VedioRecommendation = () => {
  const [videos, setData] = useState();
  const { videoid } = useParams();
   let uri='https://youtubebackend-rlno.onrender.com'
  // console.log(videoid)
  async function getdata() {
    const response = await fetch(`${uri}/api/homepagevedio`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    setData(data);
    // console.log(data)
  }
  async function handleview(id) {
    try {
      console.log(id)
      const response = await fetch(`${uri}/api/updateview`,{
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
  useEffect(() => {
    getdata();
  }, [videoid]);
  // console.log(videos);
  if (!videos) {
    return <p>Loading...</p>;
  }
  const filteredVideos = videos.filter((video) => video._id !== videoid);
  return (
    <div className="vedio-recommendation">
      {filteredVideos.map((video) => (
        <Link
        to={{
          pathname: `/vedio/${video._id}`,
        }}
          className="recommendation-card flex-div"
          onClick={()=>{
            handleview(video._id)
          }}
          key={video._id}
        >
          <img src={video.thumbnailUrl} alt={video.title} />
          <div className="recommendation-info">
            <h2>{video.title}</h2>
            <h3>{video.channel.channelName}</h3>
            <p>
              {video.viewCount} views • 1 day ago
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default VedioRecommendation;
