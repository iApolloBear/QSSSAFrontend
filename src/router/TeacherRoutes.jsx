import { Switch, Route, Redirect } from "react-router-dom";
import { TeacherPage } from "../pages/Teacher/TeacherPage";
import { ShareCodePage } from "../pages/Teacher/ShareCodePage";
import { StudentListPage } from "../pages/Teacher/StudentList";
import { GroupPage } from "../pages/Teacher/GroupPage";
import { QSSSAListPage } from "../pages/Teacher/QSSSAListPage";
import { Students } from "../pages/Admin/Students";

export const TeacherRoutes = () => {
  return (
    <Switch>
      <Route exact path="/" component={TeacherPage} />
      <Route exact path="/students" component={Students} />
      <Route exact path="/shareCode/:id" component={ShareCodePage} />
      <Route exact path="/studentlist/:id" component={StudentListPage} />
      <Route exact path="/group/:id" component={GroupPage} />
      <Route exact path="/qsssas" component={QSSSAListPage} />
      <Redirect to="/" />
    </Switch>
  );
};
