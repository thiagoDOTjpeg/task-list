import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!username || !password) {
      setError("Por favor, preencha todos os campos");
      return;
    }

    setIsSubmitting(true);

    try {
      await login(username, password);
    } catch (err) {
      setError(err.message || "Ocorreu um erro. Tente novamente");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-[80vh] bg-[#f4f7f6]">
      <form
        className="bg-white w-full max-w-full p-40 rounded-lg shadow-lg text-center"
        onSubmit={handleSubmit}
      >
        <h2 className="mb-[24px] text-[#333]">Acessar Plataforma</h2>

        {error && (
          <p className="text-[#d93025] bg-[#f8d7da] border-[1px] border-solid border-[#f5c6cb] rounded-sm p-2.5 mb-5">
            {error}
          </p>
        )}

        <div className="mb-[20px] text-left">
          <label
            htmlFor="username"
            className="block mb-2 font-bold text-[#555]"
          >
            Usuário
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            disabled={isSubmitting}
            className="w-full p-3 rounded-sm box-border border-solid border-[#ccc] border-[1px] focus:outline-none focus:border-[#007bff]"
          />
        </div>

        <div className="mb-[20px] text-left">
          <label
            htmlFor="password"
            className="block mb-2 font-bold text-[#555]"
          >
            Senha
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isSubmitting}
            className="w-full p-3 rounded-sm box-border border-solid border-[#ccc] border-[1px] focus:outline-none focus:border-[#007bff]"
          />
        </div>

        <button
          type="submit"
          className="w-full p-3 border-none rounded-sm bg-[#007bff] text-white font-bold text-[16px] cursor-pointer transition-colors delay-300 ease hover:enabled:bg-[#0056b3] disabled:bg-[#a0c3e6] disabled:cursor-not-allowed"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Entrando..." : "Entrar"}
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
