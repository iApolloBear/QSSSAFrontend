import { AppRouter } from "./router/AppRouter";
import { AuthProvider } from "./context/AuthContext";
import { SocketProvider } from "./context/SocketContext";
import "./styles/style.scss";
import { StudentsProvider } from "./context/students/StudentsContext";
import { GroupsProvider } from "./context/groups/GroupsContext";
import { MessagesProvider } from "./context/messages/MessagesContext";
import { QSSSAProvider } from "./context/qsssa/QSSSAContext";

function App() {
  return (
    <QSSSAProvider>
      <GroupsProvider>
        <StudentsProvider>
          <AuthProvider>
            <MessagesProvider>
              <SocketProvider>
                <AppRouter />
              </SocketProvider>
            </MessagesProvider>
          </AuthProvider>
        </StudentsProvider>
      </GroupsProvider>
    </QSSSAProvider>
  );
}

export default App;
