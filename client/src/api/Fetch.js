import Axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser, setProducts } from "../actions";
const Fetch = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    Axios.get(`${process.env.REACT_APP_HOSTNAME}/users/getUser`, {
      withCredentials: true,
    })
      .then((res) => {
        if (res.data.user) dispatch(setUser(res.data.user));
        else dispatch(setUser(null));
      })
      .catch((err) => {
        console.log(err);
      });

    Axios.get(`${process.env.REACT_APP_HOSTNAME}/products/getProducts`)
      .then((response) => {
        dispatch(setProducts(response.data));
      })
      .catch((err) => {
        console.log(err);
      });
  });
};
export default Fetch;
