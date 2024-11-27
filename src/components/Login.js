import React, { useState } from "react";
import api from "../services/api";
import "../styles/global.css";  

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/users/login", { email, password });
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("userId", response.data.userId);
      alert("Login realizado com sucesso!");
      window.location.href = "/";
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      alert("Usuário ou senha incorretos.");
    }
  };

  return (
    <div className="container">
      <h1>Login</h1>
      <form onSubmit={handleLogin} className="form">
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            placeholder="Digite seu email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Senha:</label>
          <input
            type="password"
            id="password"
            placeholder="Digite sua senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn-primary">
          Entrar
        </button>
      </form>
    </div>
  );
}

export default Login;
