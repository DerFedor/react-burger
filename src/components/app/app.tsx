import React, {FC, useEffect} from "react";
import ErrorBoundary from "../error-boundary/error-boundary";
import {Routes, Route, Navigate, useLocation, useNavigate, NavLink,} from 'react-router-dom';
import {
    Profile,
    ResetPassword,
    ForgotPassword,
    Registration,
    LoginPage,
    HomePage,
    FeedsPage,
    NotFound404
} from '../../pages'
import {getCookie, setCookie} from "../../utils/cookies";
import {getUserData} from "../../services/actions/user";
import {ProtectedRouteElement} from "../protected-route/protected-route";
import {IngredientPage} from "../../pages/ingredient/IngredientPage";
import {AppHeader} from "../app-header/app-header";
import {Modal} from "../modal/modal";
import {CLOSE_FEED} from "../../services/actions/feed-view";
import {FeedDetails} from "../feed-details/feed-details";
import {FeedDetailsPage} from "../../pages/feed-details-page/feed-details-page";
import {getOrdersTemporary} from "../../services/actions/feeds-list";
import {useDispatch, useSelector} from "../../services/hooks/hooks";
import {getIngredient} from "../../services/actions/burger-ingredients";



export const App: FC = () => {
    const dispatch = useDispatch();
    const {number} = useSelector((state)  => state.feed)


    const navigate = useNavigate();
    const location = useLocation();
    const background = location.state && location.state?.background;


    useEffect(() => {
        dispatch(getIngredient());
        dispatch(getOrdersTemporary());
    }, [dispatch]);

    useEffect(() => {
        const refreshToken = getCookie("refreshToken");
        if (refreshToken) {
            dispatch(getUserData(refreshToken));
        }
    }, []);


    useEffect(() => {
        location.state = null;
    }, []);

    const onClose = () => {
        navigate(-1)
        dispatch({type: CLOSE_FEED})
    }


    return (
        <ErrorBoundary>

            <AppHeader/>
            <Routes location={background || location}>
                <Route path="/" element={<HomePage/>}/>
                <Route path="/login" element={<LoginPage/>}/>
                <Route path="/feed" element={<FeedsPage/>}/>
                <Route path="/feed/:id" element={<FeedDetailsPage/>}/>
                <Route path="/ingredients/:id" element={<IngredientPage/>}/>
                <Route path="/register" element={<Registration/>}/>
                <Route path="/forgot-password" element={<ForgotPassword/>}/>
                <Route path="/reset-password" element={<ResetPassword/>}/>
                <Route path="/profile" element={<ProtectedRouteElement element={<Profile/>}/>}/>
                <Route path="/profile/orders" element={<ProtectedRouteElement element={<Profile/>}/>}/>
                <Route path="/profile/orders/:id" element={<ProtectedRouteElement
                    element={<FeedDetailsPage/>}/>}/>
                <Route path="*" element={<NotFound404/>}/>
            </Routes>

            {background &&
                <Routes>
                    <Route path="/profile/orders/:id" element={<ProtectedRouteElement
                        element={
                            <Modal onClose={onClose} header={`#${number}`}>
                                <FeedDetails/>
                            </Modal>}/>}/>
                </Routes>}
            {background &&
                <Routes>
                    <Route path="/feed/:id"
                           element={
                               <Modal onClose={onClose} header={`#${number}`}>
                                   <FeedDetails/>
                               </Modal>}/>
                </Routes>}

        </ErrorBoundary>
    );
}

export default App;
