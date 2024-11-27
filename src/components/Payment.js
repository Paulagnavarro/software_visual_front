import React, { useState } from "react";
import api from "../services/api";
import "../styles/global.css";  

const Payment = () => {
  const [paymentMethod, setPaymentMethod] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [isPaying, setIsPaying] = useState(false);

  const handlePayment = async (e) => {
    e.preventDefault();
    setIsPaying(true);

    // Determinar a URL de pagamento com base no método selecionado
    const paymentUrl = paymentMethod === "credit-card" ? "/payment/credit-card" : "/payment/pix";
    
    try {
      const response = await api.post(paymentUrl, {
        cardNumber,
        expirationDate,
        cvv,
      });
      alert("Pagamento realizado com sucesso!");
    } catch (error) {
      alert("Erro no pagamento: " + error.response?.data?.message || error.message);
    } finally {
      setIsPaying(false);
    }
  };

  return (
    <div className="container">
      <h1>Pagamento</h1>
      <form onSubmit={handlePayment}>
        <div>
          <label htmlFor="paymentMethod">Método de Pagamento</label>
          <select
            id="paymentMethod"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
          >
            <option value="">Selecione</option>
            <option value="credit-card">Cartão de Crédito</option>
            <option value="pix">PIX</option>
          </select>
        </div>

        {paymentMethod === "credit-card" && (
          <div>
            <input
              type="text"
              placeholder="Número do Cartão"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              maxLength="16"
            />
            <input
              type="text"
              placeholder="Data de Validade (MM/AA)"
              value={expirationDate}
              onChange={(e) => setExpirationDate(e.target.value)}
              maxLength="5"
            />
            <input
              type="text"
              placeholder="CVV"
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
              maxLength="3"
            />
          </div>
        )}

        <button type="submit" disabled={isPaying}>
          {isPaying ? "Processando..." : "Pagar"}
        </button>
      </form>
    </div>
  );
};

export default Payment;
