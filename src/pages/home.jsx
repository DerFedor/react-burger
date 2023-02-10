import React, { useEffect } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useNavigate, useLocation } from "react-router-dom";

import { BurgerIngredients } from "../components/burger-ingredients/burger-ingredients";
import { BurgerConstructor } from "../components/burger-constructor/burger-constructor";
import { AppHeader } from "../components/app-header/app-header";
import homeStyle from "./pages.module.css"


export const HomePage = () => {
    const location = useLocation();
    //const match = useRouteMatch();
    //const url = useResolvedPath("").pathname;

    const navigate = useNavigate();
    useEffect(() => {
        console.log(navigate);
        console.log(location);
       // console.log(url);
    }, [navigate, location]);

    return (
        <>
            <AppHeader />
            <DndProvider backend={HTML5Backend}>
                <main className={homeStyle.main}>
                    <BurgerIngredients />
                    <BurgerConstructor />
                </main>
            </DndProvider>
        </>
    );
};