import React, { useState, useEffect } from "react";
import api from "../services/api";

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await api.get("/users/profile");  
        setUser(response.data);
      } catch (error) {
        console.error("Erro ao buscar dados do usuário:", error);
      }
    };
    fetchUserData();
  }, []);

  if (!user) {
    return <p>Carregando...</p>;
  }

  return (
    <div>
      <h1>Perfil do Usuário</h1>
      <p>Email: {user.email}</p>
      <p>Data de Nascimento: {user.data_nasc}</p>
      <button onClick={() => alert("Funcionalidade de editar perfil ainda não implementada!")}>
        Editar Perfil
      </button>
    </div>
  );
};

export default Profile;
