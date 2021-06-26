import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";

import SplashPage from "./pages/SplashPage";
import DormHomePage from "./pages/Dorms/HomePage";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={() => <SplashPage />} />
        <Route path="/dorms" exact component={() => <DormHomePage />} />
      </Switch>
    </Router>
  );
};

export default App;
