import React from "react";
import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom";

import "./index.scss";
import "macro-css";

import App from "./App";

const rootElem = document.getElementById("root");

const root = ReactDOM.createRoot(rootElem);

root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
