import { AppRouter } from "./router/AppRouter";
import { AuthProvider } from "./context/AuthContext";
import "./styles/style.scss";

function App() {
  return (
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  );
}

export default App;
