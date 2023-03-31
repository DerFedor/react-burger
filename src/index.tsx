import React from "react";
import "./index.css";
import App from "./components/app/app";
import {Provider} from "react-redux";
import {createRoot} from 'react-dom/client';
import {HashRouter  as Router} from 'react-router-dom';
import {store} from './services/store'


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

