import React, {useEffect} from "react";
import ErrorBoundary from "../error-boundary/error-boundary";
import {useDispatch, useSelector} from "react-redux";
import {getIngredients} from "../../services/actions/burger-ingredients";
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import { Profile, ResetPassword, ForgotPassword, Registration, LoginPage, HomePage, FeedPage, NotFound404 } from '../../pages/index'
import {getCookie, setCookie} from "../../utils/cookies";
import { getUserData } from "../../services/actions/user";
import { ProtectedRouteElement  } from "../protected-route/protected-route";
import { IngredientPage } from "../../pages/ingredient/IngredientPage";
import {AppHeader} from "../app-header/app-header";





export const App = () => {
    const { isAuthenticated, token } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    //const access = getCookie("accessToken")

    useEffect(() => {
        dispatch(getIngredients())
    }, [dispatch])

    useEffect(() => {
        const refreshToken = getCookie('refreshToken')
        if (refreshToken) {
            dispatch(getUserData(refreshToken))
        }
    }, [])

    // useEffect(() => {
    //     console.log(token)
    // }, [token])

    return (
        <ErrorBoundary>
            <BrowserRouter>
                <AppHeader/>
                <Routes>
                    {/*<div className={appStyle.page}>*/}
                    <Route path="/" element={<HomePage/>}/>
                    <Route path="/login"  element={<LoginPage />}/>
                    {/*<Route path="/login" element={(!isAuthenticated && !token) ? <LoginPage /> : <Navigate to={'/'} />} />*/}
                    <Route path="/feed" element={<FeedPage/>}/>
                    <Route path="/ingredients/:id" element={<IngredientPage/>}/>
                    <Route path="/register" element={<Registration/>}/>
                    <Route path="/forgot-password" element={<ForgotPassword/>}/>
                    <Route path="/reset-password" element={<ResetPassword/>}/>
                    {/*<Route path="/profile" element={<Profile/>}/>*/}

                    {/*<Route path="/profile" element={isAuthenticated ? <Profile/> : <LoginPage/>}/>*/}
                    <Route path="/profile" element={<ProtectedRouteElement element={<Profile />}/>} />
                    <Route path="*" element={<NotFound404/>}/>
                    {/*</div>*/}
                </Routes>
            </BrowserRouter>
        </ErrorBoundary>
    );
}

export default App;
