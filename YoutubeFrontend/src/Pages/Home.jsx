import { useContext } from "react"
import Sidebar from "../Component/Sidebar"
import VedioCard from "../Component/VedioCard"

import './Home.css'
import { AuthContext } from "../../Utility/AuthContex"
import TopFilter from "../Component/TopFilter"
const Home = () => {
  const {toggel} = useContext(AuthContext)
  return (
   <>
   <Sidebar ></Sidebar>
   <div className={toggel ? 'vedio-container-large':'vedio-container'}>
    <TopFilter></TopFilter>
    <VedioCard></VedioCard>
   </div>
  
   </>
  )
}

export default Home
