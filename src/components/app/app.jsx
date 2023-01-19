import React from "react";
import {AppHeader} from "../app-header/app-header";
import {BurgerIngredients} from "../burger-ingredients/burger-ingredients";
import appStyle from "./app.module.css";
import {BurgerConstructor} from "../burger-constructor/burger-constructor";
//import PropTypes from 'prop-types';
import  ErrorBoundary  from "../error-boundary/error-boundary";
import {getIngredients} from "../../utils/burger-api";


export const App = () => {
   const [data, setData] = React.useState([]);

    React.useEffect(() => {
        const getData = () => {
            getIngredients()
                .then((data) => setData(data.data))
                .catch((err) => console.log(err));
        };
        getData();
    }, []);



    React.useEffect(() => console.log(data), [data]);


    return (
      <div className={appStyle.page}>
        <AppHeader />
          <ErrorBoundary>
            <main className={appStyle.main}>
              <BurgerIngredients ingredients={data}/>
              <BurgerConstructor data={data}/>
            </main>
          </ErrorBoundary>
      </div>
    );
}

export default App;
