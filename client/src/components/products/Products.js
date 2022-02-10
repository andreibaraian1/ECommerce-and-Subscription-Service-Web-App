import Axios from "axios";
import { useEffect } from "react";
import Product from "./Product";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import styles from "./Products.module.css";
import { useSelector, useDispatch } from "react-redux";
import { setProducts } from "../../actions";
const Products = (props) => {
  const products = useSelector((state) => state.products);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchProducts = () => {
      // const getProducts = await Axios.get("http://localhost:3001/getProducts");
      // const products = await getProducts.data;
      // setProducts(products);
      // dispatch(getProducts(getProducts.data));
      Axios.get("http://localhost:3001/getProducts")
        .then((response) => {
          dispatch(setProducts(response.data));
        })
        .catch((err) => {
          console.log(err);
        });
    };
    fetchProducts();
  }, [dispatch]);
  return (
    <Container className={styles.products}>
      <Row>
        {products &&
          products.map((product) => (
            <Col xs="4" key={product.id}>
              <Product key={product.id} product={product} />
            </Col>
          ))}
      </Row>
    </Container>
  );
};

export default Products;
