import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";

import SplashPage from "./pages/SplashPage";
import DormHomePage from "./pages/Dorms/HomePage";
import Appointments from "./pages/Dorms/Appointments";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={() => <SplashPage />} />
        <Route path="/dorms" exact component={() => <DormHomePage />} />
        <Route
          path="/dorms/appointments"
          exact
          component={() => <Appointments />}
        />
      </Switch>
    </Router>
  );
};

export default App;
