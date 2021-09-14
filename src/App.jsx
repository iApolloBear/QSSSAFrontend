import { AppRouter } from "./router/AppRouter";
import { UserProvider } from "./context/UserContext";
import "./styles/style.scss";

function App() {
  return (
    <UserProvider>
      <AppRouter />;
    </UserProvider>
  );
}

export default App;
