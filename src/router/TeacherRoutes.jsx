import { Switch, Route, Redirect } from "react-router-dom";
import { TeacherPage } from "../pages/Teacher/TeacherPage";
import { ShareCodePage } from "../pages/Teacher/ShareCodePage";
import { StudentListPage } from "../pages/Teacher/StudentList";
import { GroupPage } from "../pages/Teacher/GroupPage";
import { QSSSAListPage } from "../pages/Teacher/QSSSAListPage";
import { Navbar } from "../components/Layout/Navbar/Navbar";

export const TeacherRoutes = () => {
  return (
    <>
      <Navbar />
      <Switch>
        <Route exact path="/" component={TeacherPage} />
        <Route exact path="/shareCode/:id" component={ShareCodePage} />
        <Route exact path="/studentlist/:id" component={StudentListPage} />
        <Route exact path="/group/:id" component={GroupPage} />
        <Route exact path="/qsssas" component={QSSSAListPage} />
        <Redirect to="/" />
      </Switch>
    </>
  );
};
