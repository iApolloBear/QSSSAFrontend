import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Navbar } from "../components/Layout/Navbar/Navbar";
import { HomePage } from "../pages/HomePage";
import { TeacherPage } from "../pages/Teacher/TeacherPage";
import { ShareCodePage } from "../pages/Teacher/ShareCodePage";
import { StudentPage } from "../pages/Student/StudentPage";
import { StudentCode } from "../pages/Student/StudentCode";

export const AppRouter = () => {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/teacher" component={TeacherPage} />
        <Route exact path="/shareCode/:id" component={ShareCodePage} />
        <Route exact path="/student" component={StudentPage} />
        <Route exact path="/student/code/:id" component={StudentCode} />
      </Switch>
    </Router>
  );
};
