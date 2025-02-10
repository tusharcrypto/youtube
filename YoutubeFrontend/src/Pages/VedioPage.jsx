import './VedioPage.css'
import Vedio from "../Component/Vedio.jsx"
import VedioRecommendation from "../Component/VedioRecommendation.jsx"



const VedioPage = () => {
  return (
    <div className="vedio-run-conatiner">
      <Vedio></Vedio>
      <VedioRecommendation></VedioRecommendation>
    </div>
  )
}

export default VedioPage
