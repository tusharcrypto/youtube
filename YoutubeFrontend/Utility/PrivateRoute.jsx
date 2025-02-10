
import  { useContext } from 'react'
import { AuthContext } from './AuthContex'
import { Navigate } from 'react-router';

const PrivateRoute = ({children}) => {
  const {isAuthorised} = useContext(AuthContext);
  return isAuthorised ? children : <Navigate to='/login'></Navigate>
}

export default PrivateRoute
