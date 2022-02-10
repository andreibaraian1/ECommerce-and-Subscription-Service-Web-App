export const setProducts = (products) => {
    return {
        type:'SET_PRODUCTS',
        payload: products
    }
}
export const setUser = (user) => {
    return {
        type:'SET_USER',
        payload:user
    }
}