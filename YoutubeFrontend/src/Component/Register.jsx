import { useState } from "react";
import '../CSS/Register.css'
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../../Utility/AuthContex";
import { useContext } from "react";
export default function Register() {
  const navigate = useNavigate()
   let uri='https://youtubebackend-rlno.onrender.com'
  const { login } = useContext(AuthContext)
  const [userinfo, setUserinfo] = useState({
    username: "",
    useremail: "",
    password: "",
  });
  const[msg,setmsg] = useState("")
  const[isvisible,setvisible] = useState(false)

  function handleChange(e) {
    const { name, value } = e.target;
    setUserinfo((prevData) => ({ ...prevData, [name]: value }));
  }
function resetvalue(){
  setUserinfo({
    username: "",
    useremail: "",
    password: "",
})
}
  async function handleSubmit(e) {
    e.preventDefault();
    console.log(userinfo);
    resetvalue(e)
    try {
      const response = await fetch(`${uri}/api/registeruser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json", 
        },
        body: JSON.stringify(userinfo),
      });
  
       if(response.status==409){
        setmsg("User Already Exists login directly")
        setvisible(true);
        // navigate("/login")
      }else if (!response.ok) {
        console.log("User is not registered");
        setmsg("User is not Registered")
      }
      if(response.status==200) {
        const result = await response.json();
        console.log("User registered successfully:", result);
        setmsg("User registered successfully:")
        localStorage.setItem("token", result.token); 
        localStorage.setItem("User", JSON.stringify(result.user));  
        setmsg("Registration Successful");
        login();  
        navigate("/"); 
        resetvalue();
      }
    } catch (error) {
      console.log("Error:", error);
    }
  }
  

  return (
    <div className="loginform">
      <p>Register Now</p>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">User Name</label>
        <input
          type="text"
          placeholder="Enter the user name"
          required
          name="username"
          value={userinfo.username}
          onChange={handleChange}
        />

        <label htmlFor="useremail">User Email</label>
        <input
          type="email"
          placeholder="Enter the email"
          required
          name="useremail"
          value={userinfo.useremail}
          onChange={handleChange}
        />

        <label>Password</label>
        <input
          type="password"
          placeholder="password"
          required
          name="password"
          value={userinfo.password}
          onChange={handleChange}
        />
        <input type="submit" value="Register" />
        {isvisible ?<p>{msg}</p>:""}
        <Link to='/login' style={{marginTop:'10px'}}>Login Now</Link>
      </form>
    </div>
  );
}
