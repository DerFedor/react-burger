import React from "react";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import appStyle from "./app.module.css";
import BurgerConstructor from "../burger-constructor/burger-constructor";


class App extends React.Component {

  render() {
    return (
      <div className={appStyle.page}>
        <AppHeader />
        <main className={appStyle.main}>
          <BurgerIngredients />
          <BurgerConstructor />
        </main>
      </div>
    );
  }
}

export default App;
