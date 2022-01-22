import "./App.css";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Products from "./components/products/Products";
import ProductDetail from "./components/products/ProductDetail";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Navbar from "./components/UI/Navbar";
import { useState, useEffect } from "react";
import Axios from "axios";
import Logout from "./components/auth/Logout";

function App() {
  useEffect(() => {
    const fetchUser = async () => {
      const me = await Axios.get("http://localhost:3001/me", {
      withCredentials: true,
    });
    setUser(me.data.user);
    };
    fetchUser();
  }, []);
  const [user, setUser] = useState();
  return (
    <Router>
      <Navbar user={user} />
      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login setUser={setUser} user={user} />} />
        <Route path="logout" element={<Logout setUser={setUser}/>} />
      </Routes>
    </Router>
  );
}

export default App;
