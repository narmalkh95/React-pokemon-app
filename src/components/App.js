import React from "react";
import { Provider } from "react-redux";
import { Router } from "react-router-dom";
import getStore from "../store/configureStore";
import MainApp from "./MainApp";
import MainRouters from "./MainRouters";
import { createBrowserHistory } from "history";
import '../styles/style.scss'
import 'antd/dist/antd.css'

const store = getStore();
const History = createBrowserHistory();

const App = () => (
    <Provider store={store}>
        <Router history={History}>
            <MainApp>
                <MainRouters/>
            </MainApp>
        </Router>
    </Provider>
);

export default App;