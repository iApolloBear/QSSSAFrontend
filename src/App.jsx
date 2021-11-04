import { AppRouter } from "./router/AppRouter";
import { AuthProvider } from "./context/AuthContext";
import { SocketProvider } from "./context/SocketContext";
import "./styles/style.scss";
import { AppProvider } from "./context/AppContext";

function App() {
  return (
    <AuthProvider>
      <AppProvider>
        <SocketProvider>
          <AppRouter />
        </SocketProvider>
      </AppProvider>
    </AuthProvider>
  );
}

export default App;
