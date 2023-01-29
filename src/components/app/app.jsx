import React from "react";
import {AppHeader} from "../app-header/app-header";
import {BurgerIngredients} from "../burger-ingredients/burger-ingredients";
import appStyle from "./app.module.css";
import {BurgerConstructor} from "../burger-constructor/burger-constructor";
//import PropTypes from 'prop-types';
import ErrorBoundary from "../error-boundary/error-boundary";
import {getIngredients} from "../../utils/burger-api";
import {IngredientsContext} from "../../services/ingredients-сontext";
import {ConstructorDataContext} from "../../services/сonstructor-сontext";


export const App = () => {
    const [data, setData] = React.useState([]);



    //const [buns] = React.useState(["60d3b41abdacab0026a733c7"])

    React.useEffect(() => {
        const getData = () => {
            getIngredients()
                .then((data) => setData(data.data))
                .catch((err) => console.log(err));
        };
        getData();
    }, []);

    const [componentsData] = React.useState({
        buns: ["60d3b41abdacab0026a733c7"],
        components: [
            "60d3b41abdacab0026a733ca",
            "60d3b41abdacab0026a733ce",
            "60d3b41abdacab0026a733d2",
            "60d3b41abdacab0026a733d3",
            "60d3b41abdacab0026a733cd",
        ],
    });

    return (
        <div className={appStyle.page}>
            <AppHeader/>
            <ErrorBoundary>
                <main className={appStyle.main}>
                    <IngredientsContext.Provider value={data}>
                        <ConstructorDataContext.Provider value={componentsData}>
                            <BurgerIngredients/>
                            <BurgerConstructor/>
                        </ConstructorDataContext.Provider>
                    </IngredientsContext.Provider>
                </main>
            </ErrorBoundary>
        </div>
    );
}

export default App;
