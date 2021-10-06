import { useContext, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { Navbar } from "../components/Layout/Navbar/Navbar";
import { HomePage } from "../pages/HomePage";
import { TeacherPage } from "../pages/Teacher/TeacherPage";
import { ShareCodePage } from "../pages/Teacher/ShareCodePage";
import { StudentPage } from "../pages/Student/StudentPage";
import { StudentCode } from "../pages/Student/StudentCode";
import { GroupPage } from "../pages/Student/GroupPage";
import { StudentListPage } from "../pages/Teacher/StudentList";
import { GroupPage as TeacherGroupPage } from "../pages/Teacher/GroupPage";
import { PublicRoutes } from "./PublicRoutes";

export const AppRouter = () => {
  const { auth, verifyToken } = useContext(AuthContext);

  useEffect(() => {
    verifyToken();
  }, [verifyToken]);

  if (auth.checking) {
    return <h1>Loading...</h1>;
  }

  return (
    <Router>
      {auth.logged ? (
        <>
          <Navbar />
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/teacher" component={TeacherPage} />
            <Route exact path="/shareCode/:id" component={ShareCodePage} />
            <Route exact path="/student" component={StudentPage} />
            <Route exact path="/student/code/:id" component={StudentCode} />
            <Route exact path="/student/grouppage/:id" component={GroupPage} />
            <Route exact path="/studentlist/:id" component={StudentListPage} />
            <Route
              exact
              path="/teacher/group/:id"
              component={TeacherGroupPage}
            />
            <Redirect to="/" />
          </Switch>
        </>
      ) : (
        <PublicRoutes />
      )}
    </Router>
  );
};
