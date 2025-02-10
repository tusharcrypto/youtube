import "../CSS/VedioRecommendation.css";
import { Link } from "react-router";
import { useState,useEffect } from "react";
import { useParams } from "react-router";
const VedioRecommendation = () => {
  const [videos, setData] = useState();
  const { videoid } = useParams();
  console.log(videoid)
  async function getdata() {
    const response = await fetch("http://localhost:4000/api/homepagevedio", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    setData(data);
    console.log(data)
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
