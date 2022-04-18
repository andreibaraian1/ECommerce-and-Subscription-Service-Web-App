interface product {
  id: number;
  image: string;
  name: string;
  price: number;
  stock: number;
}
interface user {
  id: number;
  username: string;
  role: number;
}
interface message {
  message: string;
}

export const setProducts = (products: Array<product>) => {
  return {
    type: "SET_PRODUCTS",
    payload: products,
  };
};
export const setUser = (user: user) => {
  return {
    type: "SET_USER",
    payload: user,
  };
};
export const setModal = () => {
  return {
    type: "SET_MODAL",
  };
};
export const setModalMessage = (modalMessage: message) => {
  return {
    type: "SET_MODAL_MESSAGE",
    payload: modalMessage,
  };
};
