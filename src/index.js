import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { createBrowserHistory } from "history";

const history = createBrowserHistory();

let root = document.getElementById("root");

if (root) {
  const path = (/#!(\/.*)$/.exec(window.location.hash) || [])[1];
  if (path) history.replace(path);
  ReactDOM.render(<App />, root);
}
