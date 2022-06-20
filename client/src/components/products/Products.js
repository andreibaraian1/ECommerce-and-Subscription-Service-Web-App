import Product from "./Product";
import styles from "./Products.module.css";
import { useSelector } from "react-redux";
import ProductsCategories from "./ProductsCategories";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const Products = () => {
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
    <>
      <div className={styles.container}>
        <div className={styles.categories}>
          {category.category && (
            <Link to={`/shop`}>
              <p>Remove filters</p>
            </Link>
          )}
          <ProductsCategories />
        </div>
        <div className={styles.productsContainer}>
          {filteredItems?.map((product) => (
            <div
              key={`product-${product.id}`}
              id={`product-${product.id}`}
              className={styles.product}
            >
              <Product key={product.id} product={product} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Products;
