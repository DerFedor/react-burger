import {Navigate} from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FC } from "react";

export interface IProtectedRoute {
  // isAuthenticated?: boolean;
  // isAllowed?: boolean;
  // restrictedPath: string;
  // authenticationPath: string;
  element: any;
}

export const ProtectedRouteElement: FC<IProtectedRoute> = ({ element }) => {

  const { isAuthenticated } = useSelector((state:any) => state.user)

  return (isAuthenticated) ? element : <Navigate  to="/login" replace={true}/>

}

