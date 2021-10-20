import { Switch, Route, Redirect } from "react-router-dom";
import { Students } from "../pages/Admin/Students";
import { Teachers } from "../pages/Admin/Teachers";
import { QSSSAS } from "../pages/Admin/QSSSAS";

export const AdminRoutes = () => {
  return (
    <Switch>
      <Route exact path="/" component={Students} />
      <Route exact path="/teachers" component={Teachers} />
      <Route exact path="/qsssas" component={QSSSAS} />
      <Redirect to="/" />
    </Switch>
  );
};
