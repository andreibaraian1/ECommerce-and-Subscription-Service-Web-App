const modalMessageReducer = (state=null, action) => {
    if(action.type==='SET_MODAL_MESSAGE') 
        return action.payload;
    return state;
};
export default modalMessageReducer;