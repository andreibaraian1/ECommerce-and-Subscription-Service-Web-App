const productsReducer = (state=null, action) => {
    if(action.type==='SET_PRODUCTS') 
        return action.payload;
    return state;
};
export default productsReducer;