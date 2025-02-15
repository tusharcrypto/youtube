import { useContext } from "react";
import "../CSS/TopFilter.css";
import { AuthContext } from "../../Utility/AuthContex";

const TopFilter = () => {
  const filters = ["Music", "Sport", "Travel", "Comedy", "Entertainment"];
  const {setfilter} = useContext(AuthContext);
  return (
    <div className="top-filter">
      {filters.map((filter, index) => (
        <button key={index} onClick={()=>{
          setfilter(filter)
        }}>{filter}</button>
      ))}
    </div>
  );
};

export default TopFilter;
