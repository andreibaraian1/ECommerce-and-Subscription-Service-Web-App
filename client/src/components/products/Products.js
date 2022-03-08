
import Product from "./Product";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import styles from "./Products.module.css";
import { useSelector } from "react-redux";
import ProductsCategories from "./ProductsCategories";
import { useParams } from "react-router-dom";


const Products = (props) => {
  const category = useParams();
  let filteredItems = null;
  const products = useSelector((state) => state.products);
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
        <p>Products category : {category.category}</p>
      )}
      <Container className={styles.products}>
        <Row>
          <Col md="2">
            <ProductsCategories classname={styles.categories} />
          </Col>
          <Col>
            <Row>
              {filteredItems?.map((product) => (
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
