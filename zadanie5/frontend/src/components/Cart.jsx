import { Link, useNavigate } from "react-router-dom";

function Cart({ cart, removeFromCart }) {
  const navigate = useNavigate();

  const total = cart.reduce((sum, p) => sum + p.price, 0);

  return (
    <div style={styles.container}>
      <button style={styles.back} onClick={() => navigate("/")}>
        ← Back to products
      </button>

      <h1 style={styles.title}>🛒 Cart</h1>

      {cart.length === 0 ? (
        <p style={styles.empty}>Cart is empty</p>
      ) : (
        <>
          <div style={styles.list}>
            {cart.map((p, i) => (
              <div key={i} style={styles.card}>
                <div>
                  <h3>{p.name}</h3>
                  <p>{p.price} PLN</p>
                </div>

                <button
                  style={styles.remove}
                  onClick={() => removeFromCart(i)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <h3 style={styles.total}>Total: {total} PLN</h3>

          <Link to="/payment">
            <button style={styles.button}>Go to payment</button>
          </Link>
        </>
      )}
    </div>
  );
}

const styles = {
  container: {
    padding: "20px"
  },
  title: {
    textAlign: "center"
  },
  list: {
    display: "grid",
    gap: "10px",
    marginTop: "15px"
  },
  card: {
    padding: "12px",
    borderRadius: "12px",
    background: "#fff",
    boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  remove: {
    padding: "6px 10px",
    border: "none",
    borderRadius: "8px",
    background: "#ef4444",
    color: "white",
    cursor: "pointer"
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
    border: "none",
    background: "transparent",
    color: "#2563eb",
    cursor: "pointer",
    marginBottom: "10px",
    fontWeight: "bold"
  },
  total: {
    marginTop: "15px"
  },
  empty: {
    textAlign: "center",
    color: "#666"
  }
};

export default Cart;