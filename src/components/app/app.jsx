import React from "react";
import {AppHeader} from "../app-header/app-header";
import {BurgerIngredients} from "../burger-ingredients/burger-ingredients";
import appStyle from "./app.module.css";
import {BurgerConstructor} from "../burger-constructor/burger-constructor";
//import PropTypes from 'prop-types';
import ErrorBoundary from "../error-boundary/error-boundary";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { getIngredients } from "../../services/actions/list-ingredients";


export const App = () => {
    const dispatch = useDispatch()


    React.useEffect(() => {
        dispatch(getIngredients())
    }, [dispatch])



    return (
        <div className={appStyle.page}>
            <AppHeader/>
            <ErrorBoundary>
                <main className={appStyle.main}>
                    <BurgerIngredients/>
                    <BurgerConstructor/>
                </main>
            </ErrorBoundary>
        </div>
    );
}

export default App;
