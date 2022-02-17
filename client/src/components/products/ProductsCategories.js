import { useSelector } from "react-redux";
import styles from "./ProductsCategories.module.css";
import { Link } from "react-router-dom";
const ProductsCategories = () => {
  const products = useSelector((state) => state.products);
  let categories = null;
  if (products) {
    const result = products.map((product) => product.category);
    categories = [...new Set(result)];
  }

  return (
    <div>
      {categories &&
        categories.map((category) => (
          <div className={styles.category} key={category}>
            <Link to={`/${category}`}>
              <p>{category}</p>
            </Link>
          </div>
        ))}
    </div>
  );
};
export default ProductsCategories;
