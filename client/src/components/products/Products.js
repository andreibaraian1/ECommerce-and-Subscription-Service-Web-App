import Product from "./Product";
import styles from "./Products.module.css";
import { useSelector } from "react-redux";
import ProductsCategories from "./ProductsCategories";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useFetch } from "../../api/useFetch";

const Products = () => {
  const [filteredItems, setFilteredItems] = useState(null);
  const [enabled, setEnabled] = useState(false);
  const category = useParams();
  const products = useSelector((state) => state.products);
  const { fetcher } = useFetch();

  useEffect(() => {
    fetcher();
  }, [fetcher]);

  useEffect(() => {
    if (products) {
      const sortedProducts = products?.sort((a, b) =>
        a.name.localeCompare(b.name)
      );
      const inStock = sortedProducts?.filter((a) => a.stock !== 0);
      const outofStock = sortedProducts?.filter((a) => a.stock === 0);

      if (sortedProducts) {
        if (category.category) {
          const filteredStock = inStock.filter((product) => {
            return product.category === category.category;
          });
          const filteredOutOfStock = outofStock.filter((product) => {
            return product.category === category.category;
          });
          const items = [...filteredStock, ...filteredOutOfStock];
          setFilteredItems(items);
        } else {
          const items = [...inStock, ...outofStock];
          setFilteredItems(items);
        }
      }
    }
  }, [category.category, products]);

  useEffect(() => {
    if (category.category) {
      setEnabled(true);
    } else setEnabled(false);
  }, [category.category]);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.categories}>
          <ProductsCategories enabled={enabled} />
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
