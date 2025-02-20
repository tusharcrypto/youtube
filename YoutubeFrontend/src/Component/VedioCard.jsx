import { Link } from "react-router-dom";
import "../CSS/VedioCard.css";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Utility/AuthContex";

const VedioCard = () => {
  const [viddata, setData] = useState([]);
  const { search, filteropt } = useContext(AuthContext);
  console.log(filteropt);
   let uri='https://youtubebackend-rlno.onrender.com'
  async function getdata() {
    try {
      const response = await fetch(`${uri}/api/homepagevedio`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      let data = await response.json();
      console.log(data)
      if (search) {
        const filterdata = data.filter((video) => {
          let title = video.title.toLowerCase();
          return title.includes(search.toLowerCase());
        });
        setData(filterdata);
      } else if (filteropt) {
        const filterdata = data.filter((video) => {
          let category = video.category.toLowerCase();
          return category.includes(filteropt.toLowerCase());
        });
        console.log(filterdata);
        setData(filterdata);
      }else{
        setData(data)
      }

      console.log("Fetched Data:", data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
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
  }, [search, filteropt]); 

  if (!viddata.length) {
    return <p>Loading...</p>;
  }

  return (
    <div className="vedio-card">
      {viddata.map((vid) => (
        <Link key={vid._id} to={`/vedio/${vid._id}`} className="card">
          <img
            className={filteropt || search ? "card-img" : "cardimgregular"}  
            src={vid.thumbnailUrl}
            alt="Video Thumbnail"
            onClick={()=>{
              handleview(vid._id)
            }}
          />
          <h2>{vid.title}</h2>
          <h3>{vid.channel.channelName}</h3>
          <p>{Math.round(vid.viewCount)} views • 1 year ago</p>
        </Link>
      ))}
    </div>
  );
};

export default VedioCard;
