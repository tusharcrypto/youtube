import '../CSS/Sidebar.css';
import { useContext } from 'react';
import { AuthContext } from '../../Utility/AuthContex';
import sportsIcon from '../assets/Images/sports.png';
import musicIcon from '../assets/Images/music.png';
import exploreIcon from '../assets/Images/explore.png';
import newsIcon from '../assets/Images/news.png';
import EntertainIcon from '../assets/Images/library.png';
const TopFilter = () => {
  const { setfilter, toggel } = useContext(AuthContext);
  const filters = [
    { name: "Music", icon: musicIcon },
    { name: "Sport", icon: sportsIcon },
   
    { name: "Travel", icon: newsIcon },
    { name: "Comedy", icon: exploreIcon },
    { name: "Entertainment", icon: EntertainIcon },
  ];

  return (
    <div className={toggel ? "sidebartoogle" : "sidebar"}>
      <div className="side-menu-links">
        {filters.map((filter, index) => (
          <div
            key={index}
            className="side-links"
            onClick={() => setfilter(filter.name)}
          >
            {filter.icon && <img src={filter.icon} alt={filter.name} />}
            <p>{filter.name}</p>
          </div>
        ))}
      </div>
      <hr></hr>
    </div>
  );
};

export default TopFilter;
