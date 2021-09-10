import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Navbar } from "../components/Layout/Navbar/Navbar";
import { HomePage } from "../pages/HomePage";
import { TeacherPage } from "../pages/TeacherPage";
import { StudentPage } from "../pages/StudentPage";

export const AppRouter = () => {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/teacher" component={TeacherPage} />
        <Route exact path="/student" component={StudentPage} />
      </Switch>
    </Router>
  );
};
