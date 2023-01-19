import React from "react";
import {AppHeader} from "../app-header/app-header";
import {BurgerIngredients} from "../burger-ingredients/burger-ingredients";
import appStyle from "./app.module.css";
import {BurgerConstructor} from "../burger-constructor/burger-constructor";
//import PropTypes from 'prop-types';
import  ErrorBoundary  from "../error-boundary/error-boundary";
import {getIngredients} from "../../utils/burger-api";


export const App = () => {
   const [api, setApi] = React.useState([]);

    React.useEffect(() => {
        const getData = () => {
            getIngredients()
                .then((data) => setApi(data.data))
                .catch((err) => console.log(err));
        };
        getData();
    }, []);



    React.useEffect(() => console.log(api), [api]);


    return (
      <div className={appStyle.page}>
        <AppHeader />
          <ErrorBoundary>
            <main className={appStyle.main}>
              <BurgerIngredients api={api}/>
              <BurgerConstructor api={api}/>
            </main>
          </ErrorBoundary>
      </div>
    );
}

export default App;
