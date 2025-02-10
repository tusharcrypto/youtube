import { useState } from "react";
import '../CSS/Register.css'
export default function Register() {
  const [userinfo, setUserinfo] = useState({
    username: "",
    useremail: "",
    password: "",
  });

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
      const response = await fetch("http://localhost:4000/api/registeruser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", 
        },
        body: JSON.stringify(userinfo),
      });
  
      if (!response.ok) {
        console.log("User is not registered");
      } else {
        const result = await response.json();
        console.log("User registered successfully:", result);
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
      </form>
    </div>
  );
}
