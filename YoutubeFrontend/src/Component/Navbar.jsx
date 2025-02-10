import '../CSS/Navbar.css'
import menu from '../assets/Images/menu.png'
import logo from '../assets/Images/logo.png';
import search from '../assets/Images/search.png'
import uploadicon from '../assets/Images/upload.png'
import moreicon from '../assets/Images/more.png'
import notification from '../assets/Images/notification.png'
import user from '../assets/Images/user.png'
import profile from '../assets/Images/jack.png'
import { useContext, useState } from 'react';
import { AuthContext } from '../../Utility/AuthContex.jsx';
import { useNavigate } from 'react-router';

const Navbar = () => {
  const { isAuthorised,logout,tooglefn} = useContext(AuthContext);
  const [showProfile, setShowProfile] = useState(false);
  const [searchinfo,setsearch]= useState("");
  const {setsearchdata} = useContext(AuthContext);
// console.log(searchinfo)
  const navigate = useNavigate();
  const data = localStorage.getItem("User");
  const info = JSON.parse(data);
  function loginPage() {
    navigate("/login");
  }
  function logoutpage(){
    localStorage.removeItem("token");
    localStorage.removeItem("User")
   logout();
  }
  function handlesearch(){
    setsearchdata(searchinfo);
    setsearch("")
  }

  return (
    <nav className='flex-div'>
      <div className="nav-left flex-div">
        <img src={menu} className='menu' onClick={tooglefn} alt="menu" />
        <img src={logo} className='logo' alt="logo" onClick={()=>{
          navigate('/')
        }} />
      </div>

      <div className="nav-middle flex-div">
        <div className="search flex-div">
          <input type='text' placeholder='Search' value={searchinfo} onChange={(e)=>{
           setsearch(e.target.value)
          }} />
          <img src={search} className='search-icon' alt="search" onClick={handlesearch}/>
        </div>
      </div>

      <div className="nav-right flex-div">
        {isAuthorised ? (
          <div className="user-actions">
            <img src={uploadicon} alt="upload" />
            <img src={moreicon} alt="more" />
            <img src={notification} alt="notification" />
            <img
              src={profile}
              alt="profile"
              className='profile'
              onClick={() => setShowProfile(!showProfile)}
            />

          
            {showProfile && (
              <div className="profile-card">
                <img src={user} alt="User" className="profile-image" />
                <p className="profile-username">{info.username}</p>
                <p className="profile-username">{info.useremail}</p>
                <button className="profile-button" onClick={() => navigate("/channel")}>Channel</button>
                <button className="profile-button" onClick={logoutpage}>Log Out</button>
              </div>
            )}
          </div>
        ) : (
          <div className="signin" onClick={loginPage}>
            <img src={user} alt="User" />
            <p>Sign in</p>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
