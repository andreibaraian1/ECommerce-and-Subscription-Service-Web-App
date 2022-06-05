import { useSelector } from "react-redux";
import styles from "./ProductsCategories.module.css";
import { Link, useParams } from "react-router-dom";

const ProductsCategories = () => {
  const currentCategory = useParams();
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
            <Link to={`/shop/filter/${category}`}>
              <p
                className={
                  currentCategory.category === category
                    ? styles.currentLink
                    : styles.link
                }
              >
                {category}
              </p>
            </Link>
          </div>
        ))}
    </div>
  );
};
export default ProductsCategories;
