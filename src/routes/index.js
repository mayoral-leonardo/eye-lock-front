import { Switch } from "react-router-dom";
import Route from "./Route";

import SignIn from "../pages/SignIn/SignIn";
import Dashboard from "../pages/Dashboard/Dashboard";
import SystemFunctions from "../pages/SystemFunctions/SystemFunctions";
import UsersTable from "../pages/UsersTable/UsersTable";
import ErrorPage from "../pages/ErrorPage/ErrorPage";

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={SignIn} />
      <Route exact path="/dashboard" component={Dashboard} isPrivate />
      <Route exact path="/functions" component={SystemFunctions} isPrivate />
      <Route exact path="/users" component={UsersTable} isPrivate adminOnly/>
      <Route path="*" component={ErrorPage}/>
    </Switch>
  );
}