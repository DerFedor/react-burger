import {Navigate} from 'react-router-dom';
import { useSelector } from 'react-redux';

export function ProtectedRouteElement ({ element }) {

  const { isAuthenticated } = useSelector(state => state.user)

  return (isAuthenticated) ? element : <Navigate  to="/login" replace={true}/>

}
