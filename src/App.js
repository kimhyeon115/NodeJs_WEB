import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavigationBar from "./components/Navbar";
import ProductPage from "./components/ProductPage";
import CartPage from "./components/CartPage";
import ProductManagePage from "./components/ProductManagePage";
import { Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <Router>
      <NavigationBar />
      <Container>
        <Routes>
          <Route path="/" element={<ProductPage />} />
          <Route path="/products" element={<ProductPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/manage" element={<ProductManagePage />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
