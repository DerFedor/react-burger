import React from "react";
import "./index.css";
import App from "./components/app/app";
import {Provider} from "react-redux";
import {createRoot} from 'react-dom/client';
import {BrowserRouter as Router} from 'react-router-dom';
import {store} from './services/store'

// declare const window: any;
//
// const composeEnhancers =
//     typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
//         ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
//         : compose;
//
// const wsActions = {
//     wsInit: WS_CONNECTION_START,
//     wsInitOrder: WS_CONNECTION_START_ORDER,
//     wsSendMessage: WS_SEND_MESSAGE,
//     onOpen: WS_CONNECTION_SUCCESS,
//     onClose: WS_CONNECTION_CLOSED,
//     onError: WS_CONNECTION_ERROR,
//     onMessage: WS_GET_MESSAGE,
//     wsClose: WS_CONNECTION_END,
//
// };
//
//
// const wsUrl = "wss://norma.nomoreparties.space/orders";
//
// const enhancer = composeEnhancers(
//     applyMiddleware(thunk, socketMiddleware(wsUrl, wsActions))
// );
// const store = createStore(rootReducer, enhancer);

const container = document.getElementById("root");
const root = createRoot(container!); // createRoot(container!) if you use TypeScript
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <Router>
                <App />
            </Router>
        </Provider>
    </React.StrictMode>,
);

