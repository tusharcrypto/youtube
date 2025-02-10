import { useState } from 'react';
import '../CSS/VideoUploadForm.css';
// import Channel from './Channel';
import { useParams } from 'react-router';
const VideoUploadForm = () => {
  const [videoinfo,setVideoinfo] = useState({
    'videotitle':"",
    'videothumbnail':'',
    'videolink':'',
    'videoid':'',
    'videodesp':'',
    'category':''
  })
  const {id} = useParams();

  function handleChange(e){
    const {name,value} = e.target;
    setVideoinfo({...videoinfo,[name]:value})
  }
 async function handleSubmit(e){
    e.preventDefault();
    // let user = localStorage.getItem("User");
    // user = JSON.parse(user);
    const response = await fetch("http://localhost:4000/api/addvediobychannel",{
      method:'POST',
      headers:{
        "Content-Type":'application/json',
      },
      body:JSON.stringify({
        channelId:id,
       title:videoinfo.videotitle,
       description:videoinfo.videodesp,
       videoId:videoinfo.videoid,
       thumbnailUrl:videoinfo.videothumbnail,
       category:videoinfo.category,
       comments:[]
       
      })
    })
    if(!response.ok){
      console.log("Video is not uploaded somthing went wrong")
    }
    setVideoinfo({
      videotitle: "",
      videothumbnail: "",
      videolink: "",
      videoid: "",
      videodesp: "",
    });
    console.log("Video uploaded succesfully")
  }
  return (
    <div className="video-upload-container">
      <form className="video-upload-form" onSubmit={handleSubmit}>
        <h2>Upload Video</h2>
        <div className="form-group">
          <label htmlFor="videotitle">Video Title</label>
          <input type="text" id="videotitle" name="videotitle" onChange={handleChange} placeholder="Enter video title" />
        </div>

        <div className="form-group">
          <label htmlFor="videothumbnail">Thumbnail Image Link</label>
          <input type="text" id="videothumbnail" name="videothumbnail" onChange={handleChange} placeholder="Enter thumbnail URL" />
        </div>

        <div className="form-group">
          <label htmlFor="videolink">Video Link</label>
          <input type="text" onChange={handleChange} id="videolink" name="videolink" placeholder="Enter video URL" />
        </div>

        <div className="form-group">
          <label htmlFor="videoid">Video ID</label>
          <input type="text" onChange={handleChange} id="videoid" name="videoid" placeholder="Enter video ID" />
        </div>
        <div className="form-group">
          <label htmlFor="category">Category</label>
          <input type="text" onChange={handleChange} id="category" name="category" placeholder="Enter category" />
        </div>

        <div className="form-group">
          <label htmlFor="videodesp">Video Description</label>
          <textarea id="video-desp" onChange={handleChange} name="videodesp" placeholder="Enter video description"></textarea>
        </div>

        <button type="submit" className="upload-btn">Upload Video</button>
      </form>
    </div>
  );
};

export default VideoUploadForm;
