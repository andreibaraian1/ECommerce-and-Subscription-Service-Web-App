import Product from "./Product";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import styles from "./Products.module.css";
import { RootStateOrAny, useSelector } from "react-redux";
//@ts-ignore
import ProductsCategories from "./ProductsCategories";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

interface product {
  id: number;
  image: string;
  name: string;
  price: number;
  stock: number;
  category: string;
}
const Products: React.FC = () => {
  const [filteredItems, setFilteredItems] = useState<Array<product> | null>(
    null
  );
  const category = useParams();
  const products = useSelector((state: RootStateOrAny) => state.products);
  useEffect(() => {
    const prod = products?.sort((a: product, b: product) => b.stock - a.stock);
    if (prod) {
      if (category.category) {
        const filtered = prod.filter((product: product) => {
          return product.category === category.category;
        });
        setFilteredItems(filtered);
      } else setFilteredItems(prod);
    }
  }, [category.category, products]);

  return (
    <div className={styles.body}>
      <Container className={styles.products}>
        <Row>
          <Col md="2">
            {category.category && (
              <Link to={`/shop`}>
                <p>Remove filters</p>
              </Link>
            )}
            <ProductsCategories />
          </Col>
          <Col>
            <Row>
              {filteredItems?.map((product: product) => (
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
