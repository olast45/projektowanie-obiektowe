import { useEffect, useState } from "react";

function Products({ onBuy }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/products")
      .then((res) => res.json())
      .then(setProducts)
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <h1 style={styles.title}>🛒 Products</h1>

      <div style={styles.container}>
        {products.map((p) => (
          <div key={p.id} style={styles.card}>
            <h3>{p.name}</h3>
            <p style={styles.price}>{p.price} PLN</p>

            <button style={styles.button} onClick={() => onBuy(p)}>
              Buy
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  title: {
    textAlign: "center",
    marginBottom: "20px"
  },
  container: {
    display: "grid",
    gap: "15px"
  },
  card: {
    padding: "16px",
    borderRadius: "14px",
    background: "#fff",
    boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
    transition: "0.2s"
  },
  price: {
    color: "#64748b",
    fontWeight: "bold"
  },
  button: {
    marginTop: "10px",
    padding: "10px",
    width: "100%",
    border: "none",
    borderRadius: "10px",
    background: "#2563eb",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer"
  }
};

export default Products;