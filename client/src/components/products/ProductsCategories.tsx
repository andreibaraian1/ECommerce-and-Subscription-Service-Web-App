import { RootStateOrAny, useSelector } from "react-redux";
import styles from "./ProductsCategories.module.css";
import { Link, useParams } from "react-router-dom";
interface product {
  category: string;
}

const ProductsCategories: React.FC = () => {
  const currentCategory = useParams();
  const products = useSelector((state: RootStateOrAny) => state.products);
  let categories = null;
  if (products) {
    const result = products.map((product: product) => product.category);
    categories = [...new Set(result)];
  }

  return (
    <div>
      {categories &&
        categories.map((category: any) => (
          <div className={styles.category} key={category}>
            <Link to={`/shop/filter/${category}`}>
              <p className={currentCategory.category===category ? styles.currentLink : styles.link}>{category}</p>
            </Link>
          </div>
        ))}
    </div>
  );
};
export default ProductsCategories;
