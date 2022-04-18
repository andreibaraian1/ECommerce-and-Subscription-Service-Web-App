import Axios from "axios";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setModal, setModalMessage } from "../../actions";
import { useNavigate } from "react-router-dom";
import { Col, Container, FormControl, InputGroup, Row } from "react-bootstrap";
import { Button, Stack } from "@mui/material";
import OrderInfo from "./OrderInfo";
import styles from "./Cart.module.css";
const Cart = (props) => {
  const navigate = useNavigate();
  const products = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const [message, setMessage] = useState("");
  const [cart, setCart] = useState([]);
  const [input, setInput] = useState([]);
  const [total, setTotal] = useState();
  const [disabled, setDisabled] = useState(false);
  const [page, setPage] = useState(1);
  const fetchCart = () => {
    Axios.get("http://localhost:3001/cart/getCart", {
      withCredentials: true,
    }).then((res) => {
      const cart = res.data;
      if (cart?.error) {
        dispatch(setModal());
        dispatch(setModalMessage(cart.error));
        navigate("/");
        return;
      }
      if (!cart || cart?.length === 0) {
        setMessage("No items in cart");
        setCart([]);
      } else {
        const updatedCart = cart?.map((c) => ({
          ...products?.find((payload) => payload.id === c.id_product),
          quantity: c.quantity,
        }));
        updatedCart.sort((a, b) => a.id - b.id);
        setCart(updatedCart);

        let sum = 0;
        for (const product of updatedCart) {
          product
            ? setInput((prev) => ({ ...prev, [product?.id]: product.quantity }))
            : console.log("undefined");
          sum = sum + product.quantity * product.price;
          if (product.stock === 0) {
            setDisabled(true);
          }
        }
        setTotal(sum);
      }
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
    ).then(() => fetchCart());
  };

  // const sendOrder = async () => {
  //   const result = await Axios.post(
  //     "http://localhost:3001/order/sendOrder",
  //     { total },
  //     { withCredentials: true }
  //   );
  //   if (result.status === 200) {
  //     navigate("/"); //navigate to order
  //     Fetch();
  //   }
  // };
  const getStepButton = (page) => {
    switch (page) {
      case 1:
        return (
          <Stack direction="row" justifyContent="end">
            <Button
              disabled={disabled}
              onClick={() => {
                setPage(2);
              }}
            >
              Next
            </Button>
          </Stack>
        );
      case 2:
        return (
          <Stack direction="row" justifyContent="end">
            <Button
              onClick={() => {
                setPage(1);
              }}
            >
              Back
            </Button>
          </Stack>
        );
      default:
        console.log("button broken");
    }
  };
  return (
    <div className={styles.body}>
      {page === 1 && (
        <>
          <Container>
            {cart?.map((product) => (
              <Row>
                <div key={product.id}>
                  <Col>
                    <img src={`/images/${product.image}`} alt={product.name} />
                  </Col>
                  <Col>{product.name}</Col>
                  <Col>price/buc: {product.price}</Col>
                  <Col>quantity :{product.quantity}</Col>
                  {product.stock === 0 && <Col>Product out of stock</Col>}
                  <Col>
                    <Button
                      disabled={disabled}
                      onClick={handleInsertButton}
                      id={product.id}
                      value={1}
                    >
                      +
                    </Button>

                    <InputGroup>
                      <FormControl
                        className={`w-50`}
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

                    <Button
                      disabled={disabled}
                      onClick={handleInsertButton}
                      id={product.id}
                      value={-1}
                    >
                      -
                    </Button>
                  </Col>
                </div>
              </Row>
            ))}
          </Container>

          <p>{message}</p>
          {cart.length > 0 && (
            <div>
              <p>Total = {total} lei </p>
            </div>
          )}
        </>
      )}
      {page === 2 && <OrderInfo total={total} />}
      {cart.length > 0 && getStepButton(page)}
    </div>
  );
};

export default Cart;
