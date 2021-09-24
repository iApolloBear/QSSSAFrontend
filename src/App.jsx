import { AppRouter } from "./router/AppRouter";
import { AuthProvider } from "./context/AuthContext";
import { SocketProvider } from "./context/SocketContext";
import "./styles/style.scss";
import { StudentsProvider } from "./context/students/StudentsContext";

function App() {
  return (
    <StudentsProvider>
      <AuthProvider>
        <SocketProvider>
          <AppRouter />
        </SocketProvider>
      </AuthProvider>
    </StudentsProvider>
  );
}

export default App;
