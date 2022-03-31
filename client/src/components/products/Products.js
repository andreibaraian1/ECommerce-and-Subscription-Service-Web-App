import Product from "./Product";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import styles from "./Products.module.css";
import { useSelector } from "react-redux";
import ProductsCategories from "./ProductsCategories";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
const Products = (props) => {
  const [filteredItems, setFilteredItems] = useState(null);
  const category = useParams();
  const products = useSelector((state) => state.products);
  useEffect(() => {
    const prod = products?.sort((a, b) => b.stock - a.stock);
    if (prod) {
      if (category.category) {
        const filtered = prod.filter((product) => {
          return product.category === category.category;
        });
        setFilteredItems(filtered);
      } else setFilteredItems(prod);
    }
  }, [category.category, products]);

  return (
    <div>
      {category.category && <p>Products category : {category.category}</p>}
      <Container className={styles.products}>
        <Row>
          <Col md="2">
            {category.category && (
              <Link to={`/`}>
                <p>Remove filters</p>
              </Link>
            )}
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
