import Axios from "axios";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setModal, setModalMessage } from "../../actions";
import { useNavigate } from "react-router-dom";
import { Button, FormControl, InputGroup } from "react-bootstrap";
const Cart = (props) => {
  const navigate = useNavigate();
  const products = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const [message, setMessage] = useState("");
  const [cart, setCart] = useState([]);
  const [input, setInput] = useState([]);
  const [total, setTotal] = useState();
  const fetchCart = () => {
    Axios.get("http://localhost:3001/cart/getCart", { withCredentials: true })
      .then((res) => {
        const payload = res.data[0];
        if (res.data?.error) {
          dispatch(setModal());
          dispatch(setModalMessage(res.data.error));
          navigate("/");
        }

        if (!payload || payload.products?.length === 0) {
          setMessage("No items in cart");
          setCart([]);
        } else {
          const cartPayload = payload.products;
          let updatedCart = cartPayload.map((cartProduct) => ({
            ...cartProduct,
            ...products?.find((t) => t.id === cartProduct.id),
          }));

          setCart(updatedCart);
          let sum = 0;
          updatedCart.forEach((product) => {
            setInput((prev) => ({ ...prev, [product.id]: product.quantity }));
            sum = sum + product.quantity * product.price;
          });
          setTotal(sum);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    fetchCart();
  }, [products]); // eslint-disable-line react-hooks/exhaustive-deps
  const handleInsertInput = (event) => {
    event.preventDefault();
    const id = event.currentTarget.getAttribute("id");
    const initialQuantity = event.currentTarget.getAttribute("initialquantity");
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
      "http://localhost:3001/cart/insertCart",
      { product },
      { withCredentials: true }
    ).then(() => {
      fetchCart();
    });
  };

  const sendOrder = async () => {
    const result = await Axios.post(
      "http://localhost:3001/cart/sendOrder",
      { total },
      { withCredentials: true }
    );
    if (result.status === 200) {
      navigate("/"); //navigate to order
    }
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
            <Button onClick={handleInsertButton} id={product.id} value={1}>
              +
            </Button>

            <InputGroup className="mb-3">
              {/* <InputGroup.Text>{input[product.id] ?? ""}</InputGroup.Text> */}
              <FormControl
                type="numeric"
                onChange={(e) =>
                  setInput((prev) => ({
                    ...prev,
                    [product.id]: e.target.value,
                  }))
                }
                value={input[product.id] ?? ""}
                onBlur={handleInsertInput}
                initialquantity={product.quantity}
                id={product.id}
              />
            </InputGroup>

            <Button onClick={handleInsertButton} id={product.id} value={-1}>
              -
            </Button>
          </div>
        ))}
      <p>{message}</p>
      {cart.length > 0 && (
        <div>
          <p>Total = {total} lei </p>
          <Button onClick={sendOrder}>Send Order</Button>
        </div>
      )}
    </div>
  );
};

export default Cart;
