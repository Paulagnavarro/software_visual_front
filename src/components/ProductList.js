import React, { useEffect, useState } from "react";
import api from "../services/api";
import "../styles/global.css";  

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    nome: "",
    descricao: "",
    preco: "",
  });
  const [editingProduct, setEditingProduct] = useState(null);

  // Carregar todos os produtos
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get("/products");
        setProducts(response.data);
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
      }
    };
    fetchProducts();
  }, []);

  // Criar novo produto
  const handleCreateProduct = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/products", newProduct);
      setProducts([...products, response.data]);  
      setNewProduct({ nome: "", descricao: "", preco: "" });  
      alert("Produto criado com sucesso!");
    } catch (error) {
      alert("Erro ao criar produto: " + error.response?.data?.message || error.message);
    }
  };

  // Atualizar produto
  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    try {
      const response = await api.put(`/products/${editingProduct.id}`, editingProduct);
      setProducts(products.map((product) => (product.id === editingProduct.id ? response.data : product)));
      setEditingProduct(null);  
      alert("Produto atualizado com sucesso!");
    } catch (error) {
      alert("Erro ao atualizar produto: " + error.response?.data?.message || error.message);
    }
  };

  // Deletar produto
  const handleDeleteProduct = async (id) => {
    try {
      await api.delete(`/products/${id}`);
      setProducts(products.filter((product) => product.id !== id)); 
      alert("Produto deletado com sucesso!");
    } catch (error) {
      alert("Erro ao deletar produto: " + error.response?.data?.message || error.message);
    }
  };

  // Formulário para criar e editar produtos
  const renderProductForm = () => {
    return (
      <form onSubmit={editingProduct ? handleUpdateProduct : handleCreateProduct}>
        <input
          type="text"
          placeholder="Nome do Produto"
          value={editingProduct ? editingProduct.nome : newProduct.nome}
          onChange={(e) =>
            editingProduct
              ? setEditingProduct({ ...editingProduct, nome: e.target.value })
              : setNewProduct({ ...newProduct, nome: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Descrição"
          value={editingProduct ? editingProduct.descricao : newProduct.descricao}
          onChange={(e) =>
            editingProduct
              ? setEditingProduct({ ...editingProduct, descricao: e.target.value })
              : setNewProduct({ ...newProduct, descricao: e.target.value })
          }
        />
        <input
          type="number"
          placeholder="Preço"
          value={editingProduct ? editingProduct.preco : newProduct.preco}
          onChange={(e) =>
            editingProduct
              ? setEditingProduct({ ...editingProduct, preco: e.target.value })
              : setNewProduct({ ...newProduct, preco: e.target.value })
          }
        />
        <button type="submit">
          {editingProduct ? "Atualizar Produto" : "Criar Produto"}
        </button>
      </form>
    );
  };

  return (
    <div className="container">
      <h1>Produtos</h1>

      {renderProductForm()}

      {products.length === 0 ? (
        <p>Sem produtos disponíveis.</p>
      ) : (
        products.map((product) => (
          <div key={product.id}>
            <h3>{product.nome}</h3>
            <p>{product.descricao}</p>
            <p>Preço: R$ {product.preco}</p>
            <button onClick={() => setEditingProduct(product)}>Editar</button>
            <button onClick={() => handleDeleteProduct(product.id)}>Deletar</button>
          </div>
        ))
      )}
    </div>
  );
};

export default ProductList;
