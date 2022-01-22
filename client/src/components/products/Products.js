import Axios from "axios";
import { useState, useEffect } from "react";
import Product from "./Product";
const Products = (props) => {
  const [products, setProducts] = useState();
  useEffect(() => {
    const fetchProducts = async () => {
      const getProducts = await Axios.get("http://localhost:3001/getProducts");
      const products = await getProducts.data;
      setProducts(products);
    };
    fetchProducts();
  }, []);

  return (
    <div>
      {products && products.map((product) => <Product key={product.id} product={product} />)}
    </div>
  );
};

export default Products;
