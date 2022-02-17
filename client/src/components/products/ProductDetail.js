import Axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
const ProductDetail = ({ match }) => {
  const { id } = useParams();
  const [product, setProduct] = useState([]);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      const getProduct = await Axios.get(
        `http://localhost:3001/getProduct/id=${id}`
      );
      const product = getProduct.data;
      setProduct(product);
    };
    fetchProduct();
  }, [id]);
  const addtocart = async (event) => {
    event.preventDefault();
    const { id } = product;
    const cartProduct = {
      id: id,
      quantity: parseInt(quantity),
    };
    Axios.post(
      "http://localhost:3001/insertCart",
      { product:cartProduct },
      { withCredentials: true }
    );
  };
  return (
    <div>
      <h1>{product.name}</h1>
      <form onSubmit={addtocart}>
        <input
          type="number"
          onChange={(e) => {
            setQuantity(e.target.value);
          }}
          value={quantity}
        />
        <input type="submit" value="Add to cart" />
      </form>
    </div>
  );
};

export default ProductDetail;
