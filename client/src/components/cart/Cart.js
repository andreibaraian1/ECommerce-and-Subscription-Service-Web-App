import Axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
const Cart = (props) => {
  const products = useSelector((state) => state.products);
  const [message, setMessage] = useState("");
  const [cart, setCart] = useState([]);
  const [input, setInput] = useState([]);
  const fetchCart = () => {
    Axios.get("http://localhost:3001/getCart", { withCredentials: true })
      .then((res) => {
        const payload = res.data[0];
        if (!payload || payload.products?.length === 0) {
          setMessage("No items in cart");
        } else {
          const cartPayload = payload.products;
          let updatedCart = cartPayload.map((cartProduct) => ({
            ...cartProduct,
            ...products?.find((t) => t.id === cartProduct.id),
          }));
          setCart(updatedCart);
          updatedCart.forEach((product) => {
            setInput((prev) => ({ ...prev, [product.id]: product.quantity }));
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    fetchCart();
  }, [products]);
  const handleInsertInput = (event) => {
    event?.preventDefault();
    const id = event.currentTarget.getAttribute("id");
    const initialQuantity = event.currentTarget.getAttribute("initialQuantity");
    console.log(id, input[id] - initialQuantity);
    insertCart(id, input[id] - initialQuantity);
  };
  const handleInsertButton = (event) => {
    const id = event.currentTarget.getAttribute("id");
    const value = event.currentTarget.getAttribute("value");
    insertCart(id, value);
  };
  const insertCart = (id, value) => {
    const product = {
      id: parseInt(id),
      quantity: parseInt(value),
    };
    Axios.post(
      "http://localhost:3001/insertCart",
      { product },
      { withCredentials: true }
    ).then(() => {
      fetchCart();
    });
  };
  return (
    <div>
      {cart &&
        cart?.map((product) => (
          <div key={product.id}>
            <p>
              Product: {product.name} price/buc: {product.price} quantity :
              {product.quantity} price {product.price * product.quantity}
            </p>
            <button onClick={handleInsertButton} id={product.id} value={1}>
              +
            </button>
            <form
              onSubmit={handleInsertInput}
              id={product.id}
              initialQuantity={product.quantity}
            >
              <input
                type="number"
                onChange={(e) =>
                  setInput((prev) => ({
                    ...prev,
                    [product.id]: e.target.value,
                  }))
                }
                value={input[product.id]}
              />
              <button type="submit">Submit</button>
            </form>

            <button onClick={handleInsertButton} id={product.id} value={-1}>
              -
            </button>
          </div>
        ))}
      <p>{message}</p>
    </div>
  );
};

export default Cart;
