import { useAuth } from "../hooks/useAuth";
import LoginPage from "./login/LoginPage";

const MainLayout = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div>Carregando...</div>;
  }

  return <>{isAuthenticated ? <div>Autenticado</div> : <LoginPage />}</>;
};

export default MainLayout;
