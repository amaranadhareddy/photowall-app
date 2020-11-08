import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "./styles/style.css";
import App from "./App";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import rootReducer from "./redux/reducer";
import thunk from "redux-thunk";
import ServiceWorkerRegister from "./components/ServiceWorkerRegister";

const store = createStore(rootReducer, applyMiddleware(thunk));
ServiceWorkerRegister();
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
