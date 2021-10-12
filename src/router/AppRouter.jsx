import { useContext, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { AdminRoutes } from "./AdminRoutes";
import { PublicRoutes } from "./PublicRoutes";
import { TeacherRoutes } from "./TeacherRoutes";
import { StudentRoutes } from "./StudentRoutes";
import { RoomContext } from "../context/RoomContext";

export const AppRouter = () => {
  const { auth, verifyToken } = useContext(AuthContext);
  const { verifyRoom } = useContext(RoomContext);

  useEffect(() => {
    verifyToken();
  }, [verifyToken]);

  useEffect(() => {
    verifyRoom();
  }, [verifyRoom]);

  if (auth.checking) {
    return <h1>Loading...</h1>;
  }

  return (
    <Router>
      {auth.logged ? (
        <>
          {auth.role === "ADMIN_ROLE" && <AdminRoutes />}
          {auth.role === "TEACHER_ROLE" && <TeacherRoutes />}
          {auth.role === "STUDENT_ROLE" && <StudentRoutes />}
        </>
      ) : (
        <PublicRoutes />
      )}
    </Router>
  );
};
