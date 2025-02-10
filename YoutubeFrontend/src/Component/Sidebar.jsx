import '../CSS/Sidebar.css'
import home from '../assets/Images/home.png';
import historyIcon from '../assets/Images/history.png';
import playlistIcon from '../assets/Images/library.png';
import saveIcon from '../assets/Images/save.png';
import explore from '../assets/Images/explore.png';
import sports from '../assets/Images/sports.png';
import music from '../assets/Images/music.png';
import news from '../assets/Images/news.png';
import simon from '../assets/Images/simon.png'
import { useContext } from 'react';
import { AuthContext } from '../../Utility/AuthContex';

const Sidebar = () => {
  const{toggel} = useContext(AuthContext)
  return (
    <div className={toggel ? "sidebartoogle":"sidebar"}>
      <div className="side-menu-links">
        <div className="side-links">
          <img src={home}></img>
          <p>Home</p>
        </div>
        <div className="side-links">
          <img src={sports}></img>
          <p>Sport</p>
        </div>
        <div className="side-links">
          <img src={historyIcon}></img>
          <p>History</p>
        </div>
        <div className="side-links">
          <img src={playlistIcon}></img>
          <p>PlayList</p>
        </div>
        <div className="side-links">
          <img src={saveIcon}></img>
          <p>Save</p>
        </div>
        <div className="side-links">
          <img src={explore}></img>
          <p>Explore</p>
        </div>
        <div className="side-links">
          <img src={music}></img>
          <p>Music</p>
        </div>
        <div className="side-links">
          <img src={news}></img>
          <p>News</p>
        </div>
      </div>
      <hr></hr>
      <div className="subscribe-list">
        <h3>Subscibed</h3>
        <div className="side-links">
          <img src={simon} alt="" />
          <p>T Series</p>
        </div>
        <div className="side-links">
          <img src={simon} alt="" />
          <p>Mr Beast</p>
        </div>
        <div className="side-links">
          <img src={simon} alt="" />
          <p>Flying Beast</p>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
