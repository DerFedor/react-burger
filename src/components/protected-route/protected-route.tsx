import {Navigate, useLocation} from 'react-router-dom';
import {useSelector} from "../../services/hooks/hooks";
import {FC, ReactNode} from "react";
import {Loader} from "../loader/loader";

export interface IProtectedRoute {
    element: ReactNode;
    OnlyAuth?: boolean;

}

export const ProtectedRouteElement: FC<IProtectedRoute> = ({ element,OnlyAuth= false }) => {
    const { isAuthenticated, userName } = useSelector((state) => state.user)
    const location = useLocation();

    if (!isAuthenticated) return <>
        <Loader text={"wait..."}/>
    </>

    if (!OnlyAuth && userName) {
        const {from} = location.state || { from: {pathname: '/'}};
        return (
            <Navigate
                to={from}
            />
        )
    }

    if (OnlyAuth && !userName) {
        return (
            <Navigate
                to="/login"
                state = {{from: location}}
            />
        )
    }

    return (
        <>
        {element}
        </>
    )
}