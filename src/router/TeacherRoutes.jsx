import { Switch, Route, Redirect } from "react-router-dom";
import { TeacherPage } from "../pages/Teacher/TeacherPage";
import { ShareCodePage } from "../pages/Teacher/ShareCodePage";
import { StudentListPage } from "../pages/Teacher/StudentList";
import { GroupPage } from "../pages/Teacher/GroupPage";
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
        <Redirect to="/" />
      </Switch>
    </>
  );
};
