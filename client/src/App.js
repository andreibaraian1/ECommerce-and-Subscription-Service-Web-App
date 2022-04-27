import Register from "./components/auth/Register2";
import Login from "./components/auth/Login";
import Products from "./components/products/Products";
import ProductDetail from "./components/products/ProductDetail";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/UI/Navbar";
import Logout from "./components/auth/Logout";
import Cart from "./components/cart/Cart";
import { useSelector } from "react-redux";
import ModalLayout from "./components/UI/ModalLayout";
import Fetch from "./api/Fetch";
import Orders from "./components/orders/Orders";
import styles from "./App.module.css";
import Home from "./components/home/Home";
import About from "./components/home/About";
import Profile from "./components/profile/Profile";
import AdminPanel from "./components/adminPanel/AdminPanel";
function App() {
  const modal = useSelector((state) => state.modal);
  const modalMessage = useSelector((state) => state.modalMessage);
  Fetch();

  return (
    <div className={styles.background}>
      <Router>
        <Navbar />
        {modal && <ModalLayout message={modalMessage} />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/shop" element={<Products />} />
          <Route path="/shop/filter/:category" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
          <Route path="logout" element={<Logout />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="cart" element={<Cart />} />
          <Route path="orders" element={<Orders />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="*" element={<Navigate replace to="/" />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
