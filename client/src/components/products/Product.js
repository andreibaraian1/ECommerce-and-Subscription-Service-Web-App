import { Link } from "react-router-dom";
import styles from './Product.module.css';
const Product = (props) => {
  const addtocart = () => {
    console.log(props.product.id + " added to cart");
    var cart = JSON.parse(localStorage.getItem('cart'));
    const {id} = props.product
    const product = {
        id: id,
        quantity : 1

    };
    if(cart) {
        var ok=0
        for (var i=0; i<cart.length && ok===0;i++) 
           { if(cart[i].id===product.id)
            {
                cart[i].quantity = parseInt(cart[i].quantity) + 1;
                ok=1;
            }
        }
        if(ok===0)
        cart.push(product);
    
    } else {
        cart = [product];
    }
    console.log(cart);
    localStorage.setItem('cart',JSON.stringify(cart));
  };
  return (
    <div key={props.product.id} className={styles.product}>
      <Link to={`/products/${props.product.id}`}>
        <img src={props.product.image} alt={props.product.name} />
        <p>{props.product.name}</p>
      </Link>
      <p>{props.product.price}</p>
      <button onClick={addtocart}>Add to cart</button>
    </div>
  );
};
export default Product;
