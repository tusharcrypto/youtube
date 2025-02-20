import { useState } from 'react';
import '../CSS/VideoUploadForm.css';
// import Channel from './Channel';
import { useParams } from 'react-router';
const VideoUploadForm = ({handlepop}) => {
  const [videoinfo,setVideoinfo] = useState({
    'videotitle':"",
    'videothumbnail':'',
    'videolink':'',
    'videoid':'',
    'videodesp':'',
    'category':''
  })
   let uri='https://youtubebackend-rlno.onrender.com'
  const {id} = useParams();

  function handleChange(e){
    const {name,value} = e.target;
    setVideoinfo({...videoinfo,[name]:value})
  }
 async function handleSubmit(e){
    e.preventDefault();
    // let user = localStorage.getItem("User");
    // user = JSON.parse(user);
    const response = await fetch(`${uri}/api/addvediobychannel`,{
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
    handlepop()
    console.log("Video uploaded succesfully")
  }
  return (
    <div className="video-upload-container">
      <form className="video-upload-form" onSubmit={handleSubmit}>
        <h2>Upload Video</h2>
        <button className="close-btn" onClick={handlepop}>
              X
            </button>
        <div className="form-group">
          <label htmlFor="videotitle">Video Title</label>
          <input type="text" id="videotitle" name="videotitle" onChange={handleChange} placeholder="Enter video title" required />
        </div>

        <div className="form-group">
          <label htmlFor="videothumbnail">Thumbnail Image Link</label>
          <input type="text" id="videothumbnail" name="videothumbnail" onChange={handleChange} placeholder="Enter thumbnail URL" required/>
        </div>

        <div className="form-group">
          <label htmlFor="videolink">Video Link</label>
          <input type="text" onChange={handleChange} id="videolink" name="videolink" placeholder="Enter video URL" required />
        </div>

        <div className="form-group">
          <label htmlFor="videoid">Video ID</label>
          <input type="text" onChange={handleChange} id="videoid" name="videoid" placeholder="Enter video ID" required/>
        </div>
        <div className="form-group">
          <label htmlFor="category">Category</label>
          <input type="text" onChange={handleChange} id="category" name="category" placeholder="Enter category" required />
        </div>

        <div className="form-group">
          <label htmlFor="videodesp">Video Description</label>
          <textarea id="video-desp" onChange={handleChange} name="videodesp" placeholder="Enter video description" required></textarea>
        </div>

        <button type="submit" className="upload-btn">Upload Video</button>
      </form>
    </div>
  );
};

export default VideoUploadForm;
