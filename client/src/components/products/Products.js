import Axios from "axios";
import { useState, useEffect } from "react";
const Products = (props) => {
  const [products, setProducts] = useState();
  useEffect(() => {
    const fetchData = async () => {
      const getProducts = await Axios.get("http://localhost:3001/getProducts");
      const products = await getProducts.data;
      setProducts(products);
    };
    fetchData();
  }, []);

  return (
    <div>
      {products &&
        products.map((product) => <h1 key={product.id}>{product.nume}</h1>)}
      {console.log(products)}
    </div>
  );
};

export default Products;
