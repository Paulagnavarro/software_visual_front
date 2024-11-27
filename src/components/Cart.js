import React, { useEffect, useState } from "react";
import api from "../services/api";
import "../styles/global.css";  

const Cart = () => {
  const [cart, setCart] = useState({ itens: [] });
  const [products, setProducts] = useState([]); 
  const [quantidade, setQuantidade] = useState(1); 

  // Carregar os produtos disponíveis ao carregar o componente
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get("/products"); 
        setProducts(response.data);
      } catch (error) {
        console.error("Erro ao carregar produtos:", error);
      }
    };
    fetchProducts();
  }, []);

  // Carregar a cesta do usuário
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await api.get("/cart");
        setCart(response.data);
      } catch (error) {
        console.error("Erro ao buscar a cesta:", error);
      }
    };
    fetchCart();
  }, []);

  // Função para adicionar um item à cesta
  const handleAddItemToCart = async (productId) => {
    try {
      const userId = "id_do_usuario"; 
      const response = await api.post("/cart/add", {  
        userId,
        productId,
        quantidade,
      });
      setCart({
        ...cart,
        itens: [...cart.itens, response.data], 
      });
      alert("Produto adicionado com sucesso!");
    } catch (error) {
      console.error("Erro ao adicionar produto:", error);
    }
  };

  // Função para remover um item da cesta
  const handleRemoveItem = async (productId) => {
    try {
      await api.delete(`/cart/remove/${productId}`);  
      setCart({
        ...cart,
        itens: cart.itens.filter((item) => item.id !== productId),
      });
      alert("Produto removido com sucesso!");
    } catch (error) {
      console.error("Erro ao remover item:", error);
    }
  };

  return (
    <div className="container">
      <h1>Cesta de Compras</h1>
      {cart.itens.length === 0 ? (
        <p>Cesta vazia</p>
      ) : (
        cart.itens.map((item) => (
          <div key={item.id} className="cart-item">
            <div>
              <h3>{item.nome}</h3>
              <p>Quantidade: {item.quantidade}</p>
              <p>Preço Total: R$ {item.precoTotal.toFixed(2)}</p>
            </div>
            <button onClick={() => handleRemoveItem(item.id)}>Remover</button>
          </div>
        ))
      )}

      <h2>Adicionar Produto</h2>
      {products.length === 0 ? (
        <p>Carregando produtos...</p>
      ) : (
        <div>
          <select onChange={(e) => setQuantidade(e.target.value)} value={quantidade}>
            {[...Array(10)].map((_, i) => (
              <option key={i} value={i + 1}>{i + 1}</option>
            ))}
          </select>

          <div>
            {products.map((product) => (
              <div key={product.id}>
                <h3>{product.nome}</h3>
                <button onClick={() => handleAddItemToCart(product.id)}>
                  Adicionar à Cesta
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
