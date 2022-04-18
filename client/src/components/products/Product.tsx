import { Link } from "react-router-dom";
import styles from "./Product.module.css";
import { Card, Button } from "react-bootstrap";
import Axios from "axios";
import { useDispatch } from "react-redux";
import { setModal, setModalMessage } from "../../actions";

interface Props {
  product: product;
}
interface product {
  id: number;
  image: string;
  name: string;
  price: number;
  stock: number;
}

const Product: React.FC<Props> = (props) => {
  const product = props.product;

  const dispatch = useDispatch();
  const addToCart = async () => {
    const { id } = product;
    const insertProduct = {
      id: id,
      quantity: 1,
    };
    console.log(insertProduct);
    const insertCart = await Axios.post(
      "http://localhost:3001/cart/insertCart",
      { product: insertProduct },
      { withCredentials: true }
    );
    if (insertCart.data?.error) {
      dispatch(setModal());
      dispatch(setModalMessage(insertCart.data.error));
    }
  };
  return (
    <Card key={product.id} className={styles.product}>
      <Link to={`/products/${product.id}`}>
        <Card.Img src={`/images/${product.image}`} alt={product.name} />
        <Card.Body>
          <Card.Text>{product.name}</Card.Text>
        </Card.Body>
      </Link>
      <Card.Text>{product.price} lei</Card.Text>
      {product.stock ? (
        <Button onClick={addToCart}>Add to cart</Button>
      ) : (
        <Button disabled>Sold out</Button>
      )}
    </Card>
  );
};
export default Product;
