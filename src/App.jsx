import { AppRouter } from "./router/AppRouter";
import { AuthProvider } from "./context/AuthContext";
import { SocketProvider } from "./context/SocketContext";
import "./styles/style.scss";
import { StudentsProvider } from "./context/students/StudentsContext";
import { GroupsProvider } from "./context/groups/GroupsContext";
import { RoomProvider } from "./context/RoomContext";

function App() {
  return (
    <GroupsProvider>
      <StudentsProvider>
        <AuthProvider>
          <RoomProvider>
            <SocketProvider>
              <AppRouter />
            </SocketProvider>
          </RoomProvider>
        </AuthProvider>
      </StudentsProvider>
    </GroupsProvider>
  );
}

export default App;
