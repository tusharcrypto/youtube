import { useContext, useState } from "react";
import '../CSS/Register.css';
import { useNavigate } from "react-router";
import { AuthContext } from "../../Utility/AuthContex";

export default function Login() {
  const navigate = useNavigate();
  const{login} = useContext(AuthContext)
  const [userinfo, setUserinfo] = useState({
    useremail: "",
    password: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setUserinfo((prevData) => ({ ...prevData, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:4000/api/loginuser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userinfo),
      });

      const result = await response.json(); 

      if (response.status !== 200) {
        console.log("Login failed:", result.msg); 
      } else {
        console.log("Login successful! Token:", result.token);
        localStorage.setItem("token", result.token);
        localStorage.setItem("User",JSON.stringify(result.user))
        login(); 
        navigate("/")
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }
 
  return (
    <div className="loginform">
      <p>Login Now</p>
      <form onSubmit={handleSubmit}>
        <label htmlFor="useremail">User Email</label>
        <input
          type="email"
          placeholder="Enter the email"
          required
          name="useremail"
          onChange={handleChange}
        />

        <label>Password</label>
        <input
          type="password"
          placeholder="Password"
          required
          name="password"
          onChange={handleChange}
        />

        <input type="submit" value="Login" />
      </form>
    </div>
  );
}
