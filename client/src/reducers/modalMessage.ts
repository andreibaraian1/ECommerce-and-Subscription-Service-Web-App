interface message {
    message:string
  }
  interface action {
      type:string,
      payload?: message
  }
const modalMessageReducer = (state:message | null =null, action:action) => {
    if(action.type==='SET_MODAL_MESSAGE') 
        return action.payload;
    return state;
};
export default modalMessageReducer;