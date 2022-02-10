import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Products from "./components/products/Products";
import ProductDetail from "./components/products/ProductDetail";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/UI/Navbar";
import { useEffect } from "react";
import Axios from "axios";
import Logout from "./components/auth/Logout";
import Cart from "./components/cart/Cart";
import { useDispatch } from "react-redux";
import { setUser } from "./actions";
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchUser = () => {
      Axios.get("http://localhost:3001/me", {
        withCredentials: true,
      })
        .then((res) => {
          if (res.data.user) dispatch(setUser(res.data.user));
          else dispatch(setUser(null));
        })
        .catch((err) => {
          console.log(err);
        });

    };
    fetchUser();
  }, [dispatch]);
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
        <Route path="logout" element={<Logout />} />
        <Route path="cart" element={<Cart />} />
      </Routes>
    </Router>
  );
}

export default App;
