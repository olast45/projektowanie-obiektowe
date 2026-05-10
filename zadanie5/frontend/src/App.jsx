import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Products from "./components/Products";
import Payment from "./components/Payments";
import Cart from "./components/Cart";

function App() {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart((prev) => [...prev, product]);
  };

  const removeFromCart = (index) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div style={styles.app}>
      <Routes>
        <Route
          path="/"
          element={<Products onBuy={addToCart} />}
        />

        <Route
          path="/cart"
          element={
            <Cart
              cart={cart}
              removeFromCart={removeFromCart}
            />
          }
        />

        <Route
          path="/payment"
          element={<Payment cart={cart} />}
        />
      </Routes>
    </div>
  );
}

const styles = {
  app: {
    fontFamily: "Arial",
    padding: "30px",
    maxWidth: "500px",
    margin: "40px auto",
    background: "#f8fafc",
    borderRadius: "16px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.08)"
  }
};

export default App;