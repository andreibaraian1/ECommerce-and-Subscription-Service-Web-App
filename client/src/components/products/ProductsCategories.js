import { useSelector } from "react-redux";
import styles from "./ProductsCategories.module.css";
import { Link, useParams } from "react-router-dom";
import { Nav, Navbar } from "react-bootstrap";

const ProductsCategories = ({ enabled }) => {
  const currentCategory = useParams();
  const products = useSelector((state) => state.products);
  let categories = null;
  if (products) {
    const result = products.map((product) => product.category);
    categories = [...new Set(result)];
  }

  return (
    <div className={styles.container}>
      {categories && (
        <Navbar
          expand="lg"
          variant="light"
          bg="light"
          className="justify-content-center"
        >
          {enabled && (
            <Nav className={styles.nav}>
              <Link
                className={`${styles.link} ${styles.removeFilter}`}
                to={`/shop`}
              >
                Remove filters
              </Link>
            </Nav>
          )}
          {categories.map((category) => (
            <Nav key={category} className={styles.nav}>
              <Link
                to={`/shop/filter/${category}`}
                className={
                  currentCategory.category === category
                    ? styles.currentLink
                    : styles.link
                }
              >
                {category}
              </Link>
            </Nav>
          ))}
        </Navbar>
      )}
    </div>
  );
};
export default ProductsCategories;
