import {Navigate, Route, useLocation} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {FC, ReactNode} from "react";
import {Loader} from "../loader/loader";

export interface IProtectedRoute {
    element: ReactNode;
    //OnlyUnAuth?: boolean;

}
export const ProtectedRouteElement: FC<IProtectedRoute> = ({ element }) => {

    const { isAuthenticated } = useSelector((state:any) => state.user)

    return (isAuthenticated) ?
        <>
            {element}
        </>
            : <Navigate  to="/login" replace={true}/>

}

