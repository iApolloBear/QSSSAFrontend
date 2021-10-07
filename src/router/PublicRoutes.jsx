import { Switch, Route, Redirect } from "react-router-dom";
import { LoginPage } from "../pages/LoginPage";

export const PublicRoutes = () => {
  return (
    <Switch>
      <Route exact path="/login" component={LoginPage} />
      <Redirect to="/login" />
    </Switch>
  );
};
