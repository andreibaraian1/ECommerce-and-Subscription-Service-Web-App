export const setProducts = (products) => {
  return {
    type: "SET_PRODUCTS",
    payload: products,
  };
};
export const setUser = (user) => {
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
export const setModalMessage = (modalMessage) => {
    return {
      type: "SET_MODAL_MESSAGE",
      payload: modalMessage,
    };
}


