import Axios from "axios";
import { useEffect } from "react";
import Product from "./Product";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import styles from "./Products.module.css";
import { useSelector, useDispatch } from "react-redux";
import { setProducts } from "../../actions";
import ProductsCategories from "./ProductsCategories";
import { useParams } from "react-router-dom";
const Products = (props) => {
  const category = useParams();
  console.log(category.length);
  let filteredItems = null;
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
  if (products) {
    if (category.category) {
      filteredItems = products.filter((product) => {
        return product.category === category.category;
      });
    } else filteredItems = products;
  }
  return (
    <div>
      {Object.keys(category).length !== 0 && (
        <p>Produse din categoria {category.category}</p>
      )}
      <Container className={styles.products}>
        <Row>
          <Col md="2">
            <ProductsCategories classname={styles.categories} />
          </Col>
          <Col>
            <Row>
              {filteredItems &&
                filteredItems.map((product) => (
                  <Col md="4" key={product.id}>
                    <Product key={product.id} product={product} />
                  </Col>
                ))}
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Products;
