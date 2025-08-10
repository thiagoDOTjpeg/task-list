import { AuthProvider } from "./contexts/AuthContext";
import LoginPage from "./pages/login/LoginPage";
import MainLayout from "./pages/MainLayout";

function App() {
  return (
    <AuthProvider>
      <div>
        <MainLayout />
      </div>
    </AuthProvider>
  );
}

export default App;
