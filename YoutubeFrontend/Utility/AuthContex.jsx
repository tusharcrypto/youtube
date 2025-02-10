import { createContext, useState } from "react";

export const AuthContext = createContext();

export function Authprovider({ children }){
  const [isAuthorised,setAuthorisation] = 
  useState(localStorage.getItem("token")? true:false);
  const [search,setsearchdata] = useState("");
  const [toggel,settoggle] = useState(false)
  const [filteropt,setfilter] = useState("");
 function tooglefn(){
  settoggle(!toggel)
 }

  function login(){
    setAuthorisation(true);

  }
  function logout(){
    setAuthorisation(false);
  }
 return <AuthContext.Provider value={{isAuthorised,login,logout,toggel,tooglefn,search,setsearchdata,filteropt,setfilter}}>{children}</AuthContext.Provider>
}