const modalReducer = (state = false, action) => {
  if (action.type === "SET_MODAL") return !state;
  return state;
};
export default modalReducer;
