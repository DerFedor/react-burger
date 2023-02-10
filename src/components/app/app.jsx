import React from "react";
import {AppHeader} from "../app-header/app-header";
import {BurgerIngredients} from "../burger-ingredients/burger-ingredients";
import appStyle from "./app.module.css";
import {BurgerConstructor} from "../burger-constructor/burger-constructor";
import ErrorBoundary from "../error-boundary/error-boundary";
import {useDispatch} from "react-redux";
import {getIngredients} from "../../services/actions/burger-ingredients";
import {HTML5Backend} from "react-dnd-html5-backend";
import {DndProvider} from "react-dnd";
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {HomePage} from "../../pages/home";
import {LoginPage} from "../../pages/login";
import {NotFound404} from "../../pages/not-found/not-found";
import FoodPage from "../../pages/food";
import {Registration} from "../../pages/register";
import {ForgotPassword} from "../../pages/forgot-password";
import {ResetPassword} from "../../pages/reset-password";


export const App = () => {
    const dispatch = useDispatch()


    React.useEffect(() => {
        dispatch(getIngredients())
    }, [dispatch])


    return (
        <ErrorBoundary>
            <BrowserRouter>
                <Routes>
                    {/*<div className={appStyle.page}>*/}
                    {/*<AppHeader/>*/}


                    <Route path="/" element={<HomePage/>}/>
                    {/*<main className={appStyle.main}>*/}
                    {/*    <DndProvider backend={HTML5Backend}>*/}
                    {/*        <BurgerIngredients/>*/}
                    {/*        <BurgerConstructor/>*/}
                    {/*    </DndProvider>*/}
                    {/*</main>*/}
                    <Route path="/login" element={<LoginPage/>}/>
                    <Route path="/food" element={<FoodPage/>}/>
                    <Route path="/register" element={<Registration/>}/>
                    <Route path="/forgot-password" element={<ForgotPassword/>}/>
                    <Route path="/reset-password" element={<ResetPassword/>}/>
                    <Route path="*" element={<NotFound404/>}/>


                    {/*</div>*/}
                </Routes>
            </BrowserRouter>
        </ErrorBoundary>
    );
}

export default App;
