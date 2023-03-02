import {Navigate, Route, useLocation} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {FC} from "react";
import {Loader} from "../loader/loader";

export interface IProtectedRoute {
    // isAuthenticated?: boolean;
    // isAllowed?: boolean;
    // restrictedPath: string;
    // authenticationPath: string;
    element: any;
    //OnlyUnAuth?: boolean;

}
export const ProtectedRouteElement: FC<IProtectedRoute> = ({ element }) => {

    const { isAuthenticated } = useSelector((state:any) => state.user)

    return (isAuthenticated) ? element : <Navigate  to="/login" replace={true}/>

}


// вариант из примера куратора:

// export const ProtectedRouteElement: FC<IProtectedRoute> = ({OnlyUnAuth = false, element}) => {
//
//     const {isAuthenticated} = useSelector((state: any) => state.user);
//     const {userName} = useSelector((state: any) => state.user);
//     const location = useLocation();
//
//     if (!isAuthenticated) {
//         return (<Loader/>);
//     }
//
//     if(OnlyUnAuth && userName){
//     console.log("user", userName)
//       const {from} = location.state || {from: '/'};
//
//       return (
//           <Navigate  to={from} />
//       )
//     }
//
//     if(!OnlyUnAuth && !userName) {
//         console.log("!user", !userName)
//       return (
//           <Navigate to="/login" state={{from: location}} />
//       )
//     }
//
//
//     return (isAuthenticated) ? element : <Navigate  to="/login"/>
//     // return (
//     //     <Route>
//     //         {element}
//     //     </Route>
//     // )
//
//     // return  element
// }
//
