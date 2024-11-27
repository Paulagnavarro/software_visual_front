import React from "react";
import { Link } from "react-router-dom";
import "../styles/global.css"; 


const Home = () => {
  return (
    <div className="container">
      <h1>Bem-vindo ao Sistema de E-commerce</h1>
      <nav>
        <ul>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/register">Registrar</Link></li>
          <li><Link to="/products">Produtos</Link></li>
          <li><Link to="/cart">Cesta</Link></li>
          <li><Link to="/payment">Pagamento</Link></li>
        </ul>
      </nav>
    </div>
  );
};

export default Home;
