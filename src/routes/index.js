import { Switch } from "react-router-dom";
import Route from "./Route";

import SignIn from "../pages/SignIn/SignIn";
import SignUp from "../pages/SignUp/SignUp";

import Dashboard from "../pages/Dashboard/Dashboard";

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/register" component={SignUp} />
      <Route path="/dashboard" component={Dashboard} isPrivate />
    </Switch>
  );
}