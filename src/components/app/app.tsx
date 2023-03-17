import React, {FC, useEffect} from "react";
import ErrorBoundary from "../error-boundary/error-boundary";
import {useDispatch, useSelector} from "react-redux";
import {getIngredients} from "../../services/actions/burger-ingredients";
import {Routes, Route, Navigate, useLocation, useNavigate,} from 'react-router-dom';
import {
    Profile,
    ResetPassword,
    ForgotPassword,
    Registration,
    LoginPage,
    HomePage,
    FeedPage,
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


export const App: FC = () => {
    const {isAuthenticated, token} = useSelector((state: any) => state.user);
    const dispatch = useDispatch<any>();
    const feed = useSelector((state: any) => state.feed.feedView)

    const navigate = useNavigate();
    const location = useLocation();
    const background = location.state && location.state.background;

    useEffect(() => {
        console.log(background)
        console.log(location)
    }, [background])

    useEffect(() => {
        dispatch(getIngredients())
        // dispatch(checkUserAuth())
    }, [dispatch])

    useEffect(() => {
        const refreshToken = getCookie('refreshToken')
        if (refreshToken) {
            dispatch(getUserData(refreshToken))
        }
    }, [])

    const onClose = () => {
        navigate(-1)
        dispatch({type: CLOSE_FEED})
    }
    return (
        <ErrorBoundary>

            <AppHeader/>
            {/* eslint-disable-next-line react/jsx-no-undef */}
            <Routes location={background || location}>
                <Route path="/" element={<HomePage/>}/>
                {/*<Route path="/login"  element={<ProtectedRouteElement OnlyUnAuth={true} element={<LoginPage />}/>}/>*/}
                <Route path="/login" element={<LoginPage/>}/>

                {/*<Route path="/login" element={(!isAuthenticated && !token) ? <LoginPage /> : <Navigate to={'/'} />} />*/}
                <Route path="/feed" element={<FeedPage/>}/>
                <Route path="/ingredients/:id" element={<IngredientPage/>}/>
                <Route path="/register" element={<Registration/>}/>
                <Route path="/forgot-password" element={<ForgotPassword/>}/>
                <Route path="/reset-password" element={<ResetPassword/>}/>
                {/*<ProtectedRouteElement >*/}
                {/*<Route path="/profile" element={<Profile />} />*/}
                {/*</ProtectedRouteElement>*/}
                {/*<ProtectedRouteElement >*/}
                {/*<Route path="/profile/orders" element={<Profile />}/>*/}
                {/*</ProtectedRouteElement>*/}
                <Route path="/profile" element={<ProtectedRouteElement element={<Profile/>}/>}/>
                <Route path="/profile/orders" element={<ProtectedRouteElement element={<Profile/>}/>}/>
                {/*<Route path="/profile" element={<Profile/>}/>*/}

                {/*<Route path="/profile" element={isAuthenticated ? <Profile/> : <LoginPage/>}/>*/}
                <Route path="*" element={<NotFound404/>}/>

            </Routes>

            {background &&
                <Routes>
                <Route path="/feed/:id"
                       element={
                           <Modal onClose={onClose} header={`#${feed}`}>
                               <FeedDetails/>
                           </Modal>}/>
                    </Routes>}

        </ErrorBoundary>
    );
}

export default App;
