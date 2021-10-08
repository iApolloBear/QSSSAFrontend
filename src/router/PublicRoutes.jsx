import { Switch, Route, Redirect } from "react-router-dom";
import { LoginPage } from "../pages/LoginPage";
import { HomePage } from "../pages/HomePage";

export const PublicRoutes = () => {
  return (
    <Switch>
      <Route exact path="/login" component={LoginPage} />
      <Route exact path="/home" component={HomePage} />
      <Redirect to="/login" />
    </Switch>
  );
};
