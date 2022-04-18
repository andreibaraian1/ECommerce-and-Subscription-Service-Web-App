interface product {
  id: number;
  image: string;
  name: string;
  price: number;
  stock: number;
}
interface action {
    type:string,
    payload?: product
}
const productsReducer = (state: Array<product> | null = null, action:action) => {
  if (action.type === "SET_PRODUCTS") return action.payload;
  return state;
};
export default productsReducer;
