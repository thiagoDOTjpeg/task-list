import { useEffect, useState } from "react";
import { AuthContext } from "../hooks/useAuth";
import api from "../services/api";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUserFromToken = async () => {
      if (token) {
        try {
          api.defaults.headers.Authorization = `Bearer ${token}`;

          const { data } = await api.get("/auth/profile");

          setUser(data);
        } catch (error) {
          console.error("Token inválido. Realizando logout");
          logout();
        }
      }
      setLoading(false);
    };

    loadUserFromToken();
  }, [token]);

  const login = async (username, password) => {
    try {
      const response = await api.post("/auth/login", {
        username,
        password,
      });

      const { access_token } = response.data;

      localStorage.setItem("token", access_token);

      setToken(access_token);
    } catch (error) {
      console.error("Falha no login: ", error);
      throw new Error("Usuário ou senha inválidos");
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
    delete api.defaults.headers.Authorization;
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated: !!user, user, loading, login, logout }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};
