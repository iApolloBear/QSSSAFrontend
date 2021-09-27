import { AppRouter } from "./router/AppRouter";
import { AuthProvider } from "./context/AuthContext";
import { SocketProvider } from "./context/SocketContext";
import "./styles/style.scss";
import { StudentsProvider } from "./context/students/StudentsContext";
import { GroupsProvider } from "./context/groups/GroupsContext";

function App() {
  return (
    <GroupsProvider>
      <StudentsProvider>
        <AuthProvider>
          <SocketProvider>
            <AppRouter />
          </SocketProvider>
        </AuthProvider>
      </StudentsProvider>
    </GroupsProvider>
  );
}

export default App;
