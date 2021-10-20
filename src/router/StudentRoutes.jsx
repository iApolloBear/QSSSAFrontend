import { Switch, Route, Redirect } from "react-router-dom";
import { StudentPage } from "../pages/Student/StudentPage";
import { StudentCode } from "../pages/Student/StudentCode";
import { GroupPage } from "../pages/Student/GroupPage";
import { QSSSAListPage } from "../pages/Student/QSSSAListPage";
import { Teachers } from "../pages/Admin/Teachers";

export const StudentRoutes = () => {
  return (
    <Switch>
      <Route exact path="/" component={StudentPage} />
      <Route exact path="/teachers" component={Teachers} />
      <Route exact path="/code/:id" component={StudentCode} />
      <Route exact path="/group/:id" component={GroupPage} />
      <Route exact path="/qsssas" component={QSSSAListPage} />
      <Redirect to="/" />
    </Switch>
  );
};
