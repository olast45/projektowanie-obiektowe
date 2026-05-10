import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Payment({ cart }) {
  const navigate = useNavigate();

  const [cardNumber, setCardNumber] = useState("");
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  const total = cart.reduce((sum, p) => sum + p.price, 0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch("http://127.0.0.1:8000/api/payments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        items: cart,
        amount: total,
        cardNumber
      })
    });

    const data = await res.json();
    setResponse(data);
    setLoading(false);
  };

  return (
    <div style={styles.card}>
      {/* 🔙 BACK BUTTON */}
      <button style={styles.back} onClick={() => navigate("/cart")}>
        ← Back to cart
      </button>

      <h2>💳 Checkout</h2>

      <p>Total: <b>{total} PLN</b></p>

      <form onSubmit={handleSubmit}>
        <input
          style={styles.input}
          type="text"
          placeholder="Card number"
          onChange={(e) => setCardNumber(e.target.value)}
        />

        <button style={styles.button} type="submit">
          {loading ? "Processing..." : "Pay now"}
        </button>
      </form>

      {response && (
        <div style={styles.responseBox}>
          <p><b>Status:</b> {response.status}</p>
          {response.message && <p>{response.message}</p>}
        </div>
      )}
    </div>
  );
}

const styles = {
  card: {
    padding: "20px",
    borderRadius: "16px",
    background: "#fff",
    boxShadow: "0 10px 25px rgba(0,0,0,0.12)"
  },
  input: {
    width: "94%",
    padding: "12px",
    borderRadius: "10px",
    border: "1px solid #ddd",
    marginTop: "10px"
  },
  button: {
    marginTop: "15px",
    width: "100%",
    padding: "12px",
    border: "none",
    borderRadius: "10px",
    background: "#16a34a",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer"
  },
  back: {
    marginBottom: "10px",
    border: "none",
    background: "transparent",
    cursor: "pointer",
    color: "#2563eb",
    fontWeight: "bold"
  },
  responseBox: {
    marginTop: "20px",
    padding: "12px",
    borderRadius: "12px",
    background: "#ecfdf5",
    border: "1px solid #22c55e",
    color: "#166534"
  }
};

export default Payment;