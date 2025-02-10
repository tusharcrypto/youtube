import { Route, Routes} from 'react-router-dom'
import './App.css'
import Navbar from './Component/Navbar'
import Home from './Pages/Home.jsx'
import VedioPage from './Pages/VedioPage.jsx'
import { Authprovider } from '../Utility/AuthContex.jsx'
import Login from './Component/Login.jsx'
import PrivateRoute from '../Utility/PrivateRoute.jsx'
import Channel from './Component/Channel.jsx'
import ChannelPage from './Component/ChannelPage.jsx'
import Register from './Component/Register.jsx'


function App() {

  return (
    <>
    <Authprovider>
     <Navbar/>
     <Routes>
      <Route path='/' element={<PrivateRoute><Home></Home></PrivateRoute>}></Route>
      <Route path='/vedio/:videoid' element={<VedioPage></VedioPage>}></Route>
      <Route path='/login' element={<Login></Login>}></Route>
      <Route path='/channel' element={<Channel></Channel>}></Route>
      <Route path='/channelPage/:id' element={<ChannelPage/>}></Route>
      <Route path='/register' element={<Register></Register>}></Route>
     </Routes>
     </Authprovider>
    </>
  )
}

export default App
