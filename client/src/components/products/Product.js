import { Link } from "react-router-dom";
import styles from "./Product.module.css";
import { Card, Button } from "react-bootstrap";
import Axios from "axios";
import { useDispatch } from "react-redux";
import { setModal, setModalMessage } from "../../actions";
const Product = (props) => {
  const dispatch = useDispatch();
  const addtocart = async () => {
    const { id } = props.product;
    const product = {
      id: id,
      quantity: 1,
    };
    const insertCart = await Axios.post(
      "http://localhost:3001/insertCart",
      { product },
      { withCredentials: true }
    );
    if (insertCart.data?.error) {
      dispatch(setModal());
      dispatch(setModalMessage(insertCart.data.error));
    }
  };
  return (
    <Card key={props.product.id} className={styles.product}>
      <Link to={`/products/${props.product.id}`}>
        <Card.Img
          src={`images/${props.product.image}`}
          alt={props.product.name}
        />
        <Card.Body>
          <Card.Text>{props.product.name}</Card.Text>
        </Card.Body>
      </Link>
      <Card.Text>{props.product.price} lei</Card.Text>
      {props.product.stock ? (
        <Button onClick={addtocart}>Add to cart</Button>
      ) : (
        <Button disabled>Sold out</Button>
      )}
    </Card>
  );
};
export default Product;
