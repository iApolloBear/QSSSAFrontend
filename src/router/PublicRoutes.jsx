import { Switch, Route, Redirect } from "react-router-dom";
import { LoginPage } from "../pages/LoginPage";
import { Dashboard } from "../pages/Admin/Dashboard";

export const PublicRoutes = () => {
  return (
    <Switch>
      <Route exact path="/login" component={LoginPage} />
      <Route exact path="/dashboard" component={Dashboard} />
      <Redirect to="/login" />
    </Switch>
  );
};
