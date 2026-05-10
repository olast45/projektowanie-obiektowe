import { useState } from "react";

function Payment({ product, onBack }) {
  const [cardNumber, setCardNumber] = useState("");
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch("http://127.0.0.1:8000/api/payments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        productId: product.id,
        amount: product.price,
        cardNumber
      })
    });

    const data = await res.json();
    setResponse(data);
    setLoading(false);
  };

  return (
    <div style={styles.card}>
      <button style={styles.back} onClick={onBack}>
        ← Back
      </button>

      <h2>💳 Checkout</h2>
      <p style={styles.product}>
        Buying: <b>{product.name}</b> ({product.price} PLN)
      </p>

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
          <h3>Payment result</h3>
          <p>
            <b>Status:</b> {response.status}
          </p>
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
  back: {
    marginBottom: "10px",
    border: "none",
    background: "transparent",
    cursor: "pointer",
    color: "#2563eb",
    fontWeight: "bold"
  },
  product: {
    marginBottom: "10px",
    color: "#475569"
  },
  input: {
    width: "90%",
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