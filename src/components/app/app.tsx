import React from "react";
import {AppHeader} from "../app-header/app-header";
import {BurgerIngredients} from "../burger-ingredients/burger-ingredients";
import appStyle from "./app.module.css";
import {BurgerConstructor} from "../burger-constructor/burger-constructor";
//import PropTypes from 'prop-types';


const apiUrl = "https://norma.nomoreparties.space/api/ingredients";

// class ErrorBoundary extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = { hasError: false };
//     }
//
//     // с помощью этого метода меняем стейт компонента при возникновении ошибки:
//     static getDerivedStateFromError(error) {
//         return { hasError: true };
//     }
//
//     // с помощью этого метода логируем информацию об ошибке:
//     componentDidCatch(error, info) {
//         console.log("Возникла ошибка!", error, info);
//     }
//
//     render() {
//         if (this.state.hasError) {
//             // если возникла ошибка, сообщаем об этом пользователю в специальном компоненте:
//             return (
//                 <section>
//                     <h1>Что-то пошло не так :(</h1>
//                     <p>
//                         В приложении произошла ошибка. Пожалуйста, перезагрузите страницу.
//                     </p>
//                 </section>
//             );
//         }
//         // если всё работает штатно, рендерим дочерние компоненты
//         return this.props.children;
//     }
// };

//ПИШЕТ ЧТО TS2339: Property 'hasError' does not exist on type 'Readonly<{}>'.
//ПИШЕТ ЧТО TS2339: Property 'children' does not exist on type 'Readonly<{}>'.



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

 //   React.useEffect(() => console.log(api), [api]);
    return (
      <div className={appStyle.page}>
        <AppHeader />
          {/*<ErrorBoundary>*/}
            <main className={appStyle.main}>
              <BurgerIngredients api={api}/>
              <BurgerConstructor api={api}/>
            </main>
          {/*</ErrorBoundary>*/}
      </div>
    );
}

export default App;
