import Axios from "axios";
import { useEffect } from "react";

const Cart = (props) => {
  useEffect(() => {
    const fetchProduct = async () => {
      const getCart = localStorage.getItem("cart");
      const cart = JSON.parse(getCart);
      console.log(cart);
      if (cart) {
        cart.map(async(product) => {
          const getProduct = await Axios.get(
            `http://localhost:3001/getProduct/id=${product.id}`
          );
          const produs1 = getProduct.data;
          console.log(produs1);
        });
      }
    };
    fetchProduct();
  }, []);

  return <div></div>;
};

export default Cart;
