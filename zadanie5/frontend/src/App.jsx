import { useState } from "react";
import Products from "./components/Products";
import Payment from "./components/Payments";

function App() {
  const [selectedProduct, setSelectedProduct] = useState(null);

  return (
    <div style={styles.app}>

      {!selectedProduct ? (
        <Products onBuy={setSelectedProduct} />
      ) : (
        <Payment
          product={selectedProduct}
          onBack={() => setSelectedProduct(null)}
        />
      )}
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