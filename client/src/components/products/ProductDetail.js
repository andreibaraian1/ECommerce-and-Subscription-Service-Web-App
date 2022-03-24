import Axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setModal, setModalMessage } from "../../actions";
import { Card, Button, Form } from "react-bootstrap";
import { Input } from "@mui/material";
import styles from './ProductDetail.module.css';
const ProductDetail = ({ match }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const [product, setProduct] = useState([]);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      const getProduct = await Axios.get(
        `http://localhost:3001/products/getProduct/${id}`
      );
      const product = getProduct.data;
      setProduct(product);
    };
    fetchProduct();
  }, [id]);
  const addtocart = async (event) => {
    event.preventDefault();
    const { id } = product;
    const cartProduct = {
      id: id,
      quantity: parseInt(quantity),
    };
    const insertCart = await Axios.post(
      "http://localhost:3001/cart/insertCart",
      { product: cartProduct },
      { withCredentials: true }
    );
    if (insertCart.data?.error) {
      dispatch(setModal());
      dispatch(setModalMessage(insertCart.data.error));
    } else {
      navigate("/cart");
    }
  };
  return (
    // <div>
    //   <h1>{product.name}</h1>
    //   <form onSubmit={addtocart}>
    //     <input
    //       type="number"
    //       onChange={(e) => {
    //         setQuantity(e.target.value);
    //       }}
    //       value={quantity}
    //     />
    //     <input type="submit" value="Add to cart" />
    //   </form>
    // </div>
    <Card key={product.id} className={styles.product}>
      <Card.Img src={`/images/${product.image}`} alt={product.name} />
      <Card.Body>
        <Card.Text>{product.name}</Card.Text>
      </Card.Body>
      <Card.Text>{product.price} lei</Card.Text>
      {product.stock ? (
        <Form>
          <Input
            type="number"
            onChange={(e) => {
              setQuantity(e.target.value);
            }}
            value={quantity}
          ></Input>
          <Button onClick={addtocart}>Add to cart</Button>
        </Form>
      ) : (
        <Button disabled>Sold out</Button>
      )}
    </Card>
  );
};

export default ProductDetail;
