interface action {
  type:string,
}
const modalReducer = (state:boolean = false, action:action) => {
  if (action.type === "SET_MODAL") return !state;
  return state;
};
export default modalReducer;
