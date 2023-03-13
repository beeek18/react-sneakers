import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import './index.scss';
import 'macro-css';

const rootElem = document.getElementById("root");

const root = ReactDOM.createRoot(rootElem);

root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
