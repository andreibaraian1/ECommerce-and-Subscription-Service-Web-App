import Axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
const ProductDetail = ({ match }) => {
  const { id } = useParams();
  const [product, setProduct] = useState([]);
  const [quantity, setQuantity] = useState(1);
  useEffect(() => {
    const fetchProduct = async () => {
      const getProduct = await Axios.get(
        `http://localhost:3001/getProduct/id=${id}`
      );
      const product = getProduct.data;
      setProduct(product);
    };
    fetchProduct();
  }, [id]);
  const addtocart = (event) => {
    event.preventDefault();
    var cart = JSON.parse(localStorage.getItem("cart"));
    const { id } = product;
    const cartProduct = {
      id: id,
      quantity: parseInt(quantity),
    };
    if (cart) {
      var ok = 0;
      for (var i = 0; i < cart.length && ok === 0; i++) {
        if (cart[i].id === cartProduct.id) {
          cart[i].quantity = parseInt(cart[i].quantity) + parseInt(quantity);
          ok = 1;
        }
      }
      if (ok === 0) cart.push(cartProduct);
    } else {
      cart = [cartProduct];
    }
    console.log(cart);
    localStorage.setItem("cart", JSON.stringify(cart));
  };
  return (
    <div>
      <h1>{product.name}</h1>
      <form onSubmit={addtocart}>
        <input
          type="number"
          onChange={(e) => {
            setQuantity(e.target.value);
          }}
          value={quantity}
        />
        <input type="submit" value="Add to cart" />
      </form>
    </div>
  );
};

export default ProductDetail;
