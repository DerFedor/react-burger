import React from "react";
import {AppHeader} from "../app-header/app-header";
import {BurgerIngredients} from "../burger-ingredients/burger-ingredients";
import appStyle from "./app.module.css";
import {BurgerConstructor} from "../burger-constructor/burger-constructor";

const apiUrl = "https://norma.nomoreparties.space/api/ingredients";

export const App = () => {
    const [api, setApi] = React.useState([]);

    React.useEffect(() => {
        const getData = async () => {
            try {
                const res = await fetch(apiUrl);
                const data = await res.json();
                setApi(data.data);
            } catch (err) {
                console.log(err);
            }
        };
        getData();
    }, []);

    React.useEffect(() => console.log(api), [api]);
    return (
      <div className={appStyle.page}>
        <AppHeader />
        <main className={appStyle.main}>
          <BurgerIngredients api={api}/>
          <BurgerConstructor api={api}/>
        </main>
      </div>
    );
}

export default App;
