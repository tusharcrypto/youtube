import { useState } from "react";

const ChannelForm = (prop) => {
  const [formData, setFormData] = useState({
    channelName: '',
    description: '',
    profileimage: null,
    channelbanner: null,
  });

  const [errors, setErrors] = useState({});
  const [submissionStatus, setSubmissionStatus] = useState(null); 

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'profileimage' || name === 'channelbanner') {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.channelName.trim()) {
      newErrors.channelName = 'Channel name is required';
    }
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }
    // if (!formData.profileimage) {
    //   newErrors.profileimage = 'Profile image is required';
    // }
    // if (!formData.channelbanner) {
    //   newErrors.channelbanner = 'Channel banner is required';
    // }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
       
        console.log('Form Data:', formData);
        setSubmissionStatus('success');
        alert('Channel created successfully!');
        let user = localStorage.getItem("User");
        user = JSON.parse(user);
        const respone = await fetch("http://localhost:4000/api/createchannel",{
          method:'POST',
          headers:{
            "Content-Type":"application/json",
          },
          body:JSON.stringify({channelName:formData.channelName,description:formData.description,owner:user._id})
        })
       if(!respone.ok){
        console.log("Channnel is not created")
       }
       console.log("channel created succesfully")
       prop.setchannel();
        setFormData({
          channelName: '',
          description: '',
          profileimage: null,
          channelbanner: null,
        });
      } catch (error) {
        console.error('Error submitting form:', error);
        setSubmissionStatus('error');
        alert('Failed to create channel. Please try again.');
      }
    }
  };

  return (
    <div>
       <form className="create-channel-form" onSubmit={handleSubmit}>
      <h2>Create Channel</h2>

      <div className="form-group">
        <label htmlFor="channelName">Channel Name</label>
        <input
          type="text"
          id="channelName"
          name="channelName"
          value={formData.channelName}
          onChange={handleChange}
          placeholder="Enter channel name"
        />
        {errors.channelName && <span className="error">{errors.channelName}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Enter channel description"
        />
        {errors.description && <span className="error">{errors.description}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="profileimage">Profile Image</label>
        <input
          type="file"
          id="profileimage"
          name="profileimage"
          accept="image/*"
          onChange={handleChange}
        />
        {/* {errors.profileimage && <span className="error">{errors.profileimage}</span>} */}
      </div>

      <div className="form-group">
        <label htmlFor="channelbanner">Channel Banner</label>
        <input
          type="file"
          id="channelbanner"
          name="channelbanner"
          accept="image/*"
          onChange={handleChange}
        />
        {/* {errors.channelbanner && <span className="error">{errors.channelbanner}</span>} */}
      </div>

      <button type="submit" className="submit-button">Create Channel</button>

      {submissionStatus === 'success' && (
        <p className="success-message">Channel created successfully!</p>
      )}
      {submissionStatus === 'error' && (
        <p className="error-message">Failed to create channel. Please try again.</p>
      )}
    </form>
      
    </div>
  )
}

export default ChannelForm
