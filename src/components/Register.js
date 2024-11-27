import React, { useState } from "react";
import api from "../services/api";
import "../styles/global.css";  

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("As senhas não coincidem!");
      return;
    }
    try {
      const response = await api.post("/users/novouser", {
        name,
        email,
        password,
      });
      alert("Cadastro realizado com sucesso!");
    } catch (error) {
      alert("Erro no cadastro: " + error.response.data.message);
    }
  };

  return (
    <div className="container">
      <h1>Registrar</h1>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Confirmar Senha"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button type="submit">Registrar</button>
      </form>
    </div>
  );
};

export default Register;
