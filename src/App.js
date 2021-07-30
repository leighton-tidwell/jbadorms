import React from "react";
import uuid from "react-uuid";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";

import SplashPage from "./pages/SplashPage";
import DormHomePage from "./pages/Dorms/HomePage";
import Appointments from "./pages/Dorms/Appointments";
import Processing from "./pages/Dorms/Processing";

const App = () => {
  const LOGO_TEXT = { dorms: "JBA Dorms" };
  const navigationLinks = {
    dorms: [
      {
        id: uuid(),
        text: "home",
        href: "/dorms",
      },
      {
        id: uuid(),
        text: "appointments",
        href: "/dorms/appointments",
      },
      {
        id: uuid(),
        text: "inspection",
        href: "/dorms/inspection",
      },
      {
        id: uuid(),
        text: "processing",
        href: "/dorms/processing",
        dropdown: [
          {
            id: uuid(),
            text: "UH Assignment Data Form",
            href: "/dorms/uh-assignment-data-form",
          },
          {
            id: uuid(),
            text: "UH Conditions Checklist",
            href: "/dorms/uh-conditions-checklist",
          },
          {
            id: uuid(),
            text: "Resident Responsibilities",
            href: "/dorms/resident-responsibilities",
          },
          {
            id: uuid(),
            text: "Mandatory Use of Mattress Protectors",
            href: "/dorms/mandatory-use-of-mattress-protectors",
          },
        ],
      },
      {
        id: uuid(),
        text: "bay orderly",
        href: "/dorms/bay-orderly",
        dropdown: [
          {
            id: uuid(),
            text: "Bay Orderly Briefing",
            href: "/dorms/bay-orderly-briefing",
          },
          {
            id: uuid(),
            text: "Bay Orderly Daily Checklist",
            href: "/dorms/bay-orderly-daily-checklist",
          },
        ],
      },
    ],
  };

  return (
    <Router>
      <Switch>
        <Route path="/" exact component={() => <SplashPage />} />
        <Route
          path="/dorms"
          exact
          component={() => (
            <DormHomePage
              logo={LOGO_TEXT.dorms}
              navigationLinks={navigationLinks.dorms}
            />
          )}
        />
        <Route
          path="/dorms/appointments"
          exact
          component={() => (
            <Appointments
              logo={LOGO_TEXT.dorms}
              navigationLinks={navigationLinks.dorms}
            />
          )}
        />
        <Route
          path="/dorms/processing"
          exact
          component={() => (
            <Processing
              logo={LOGO_TEXT.dorms}
              navigationLinks={navigationLinks.dorms}
            />
          )}
        />
      </Switch>
    </Router>
  );
};

export default App;
