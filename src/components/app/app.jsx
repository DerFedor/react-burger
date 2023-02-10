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
                    <DndProvider backend={HTML5Backend}>
                        <BurgerIngredients/>
                        <BurgerConstructor/>
                    </DndProvider>
                </main>
            </ErrorBoundary>
        </div>
    );
}

export default App;
