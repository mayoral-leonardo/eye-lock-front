import { Switch } from "react-router-dom";
import Route from "./Route";

import SignIn from "../pages/SignIn/SignIn";

import Dashboard from "../pages/Dashboard/Dashboard";

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={SignIn} />
      <Route exact path="/dashboard" component={Dashboard} isPrivate />
    </Switch>
  );
}