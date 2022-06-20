import Axios from "axios";
import { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { setUser, setProducts } from "../actions";

export const useFetch = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const fetcher = useCallback(() => {
    Axios.get(`${process.env.REACT_APP_HOSTNAME}/users/getUser`, {
      withCredentials: true,
    })
      .then((res) => {
        if (res.data.user) dispatch(setUser(res.data.user));
        else dispatch(setUser(null));
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
    Axios.get(`${process.env.REACT_APP_HOSTNAME}/products/getProducts`)
      .then((response) => {
        dispatch(setProducts(response.data));
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, [dispatch]);
  return {
    loading,
    error,
    fetcher,
  };
};
