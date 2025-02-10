import '../CSS/ChannelForm.css';
import '../CSS/Channel.css'; 
import ChannelForm from './ChannelForm';
import jack from '../assets/Images/jack.png';
import { useEffect, useState } from 'react';
import plus from '../assets/Images/plus.png';
import { Link } from 'react-router-dom'; 

const Channel = () => {
  const [chanelinfo, setchannel] = useState([]); 
  const [addchannel, setaddChannel] = useState(false);

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
      setchannel(data);
      console.log("Fetched channels:", data);
    } catch (error) {
      console.error('No channels found', error);
    }
  }

  function handleToggle() {
    setaddChannel(!addchannel);
  }

  function handleChannelCreated() {
    setaddChannel(false); 
    getchannel();  
  }

  useEffect(() => {
    getchannel();
  }, []); 

  return (
    <div className="channel-container">
      {chanelinfo.length === 0 && (
        <div className="no-channel-message">
          <p>You don not have a channel yet.</p>
          <div className="createchannel" onClick={handleToggle}>
            <img src={plus} alt="Create Channel" />
            <p>Create Channel</p>
          </div>
        </div>
      )}

  
      {chanelinfo.map((channel) => (
        <div key={channel._id} className="channel-header">
          <img src={jack} alt="Profile" className="profile-image" />
          <div className="channel-info">
            <h2 className="channel-name">{channel.channelName}</h2>
            <p className="channel-description">{channel.description}</p>
            <p className="channel-stats">
              {channel.subscribercount} Subscribers • 0 Videos
            </p>
          </div>
          <button className="subscribe-button">
            {channel.issubscribed ? 'Subscribed' : 'Subscribe'}
          </button>
          <Link to={`/channelPage/${channel._id}`}>View Channel Page</Link>
        </div>
      ))}

     
      {addchannel ? (
        <ChannelForm setchannel={handleChannelCreated} />
      ) : (
        <div className="createchannel" onClick={handleToggle}>
          <img src={plus} alt="Add Channel" />
          <p>Create Channel</p>
        </div>
      )}
    </div>
  );
};

export default Channel;
