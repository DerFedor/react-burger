import {Navigate} from 'react-router-dom';
import { useSelector } from 'react-redux';

export function ProtectedRouteElement ({ element }) {

  const { isAuthenticated, token } = useSelector(state => state.user)

  return (isAuthenticated) ? element : <Navigate  to="/login" replace={true}/>

}
// import { redirect, Route } from 'react-router-dom';
// import { useSelector } from 'react-redux';
//
// export function ProtectedRouteElement({ children, ...rest }) {
//
//     const { isAuthenticated } = useSelector(state => state.user)
//
//     return (
//         <Route
//             {...rest}
//             render={({ location }) =>
//                 isAuthenticated ? (children) : (<redirect to={{ pathname: '/login', state: { from: location } }} />)
//             }
//         />
//     );
// }