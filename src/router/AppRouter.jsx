import { useContext, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { AdminRoutes } from "./AdminRoutes";
import { PublicRoutes } from "./PublicRoutes";
import { TeacherRoutes } from "./TeacherRoutes";
import { StudentRoutes } from "./StudentRoutes";
import { Dashboard } from "../components/Layout/Dashboard/Dashboard";

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
        <Dashboard>
          {auth.role === "ADMIN_ROLE" && <AdminRoutes />}
          {auth.role === "TEACHER_ROLE" && <TeacherRoutes />}
          {auth.role === "STUDENT_ROLE" && <StudentRoutes />}
        </Dashboard>
      ) : (
        <PublicRoutes />
      )}
    </Router>
  );
};
