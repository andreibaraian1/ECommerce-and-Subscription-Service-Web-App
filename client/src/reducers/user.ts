interface user {
    id:number,
    username:string,
    role:number,
}
interface action {
    type:string,
    payload?: user
}
const userReducer = (state:user | null=null, action:action) => {
    if(action.type=== 'SET_USER')
        return action.payload;
    return state;
}
export default userReducer;