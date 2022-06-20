import { Button, TextField, FormControl } from "@mui/material";
import { useState } from "react";
import Axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useFetch } from "../../../api/useFetch";
const AddProduct = (props) => {
  const [name, setName] = useState("");
  const [stock, setStock] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [details, setDetails] = useState("");
  const { fetcher } = useFetch();

  const handleSubmit = async () => {
    if (!name || !stock || !image || !price || !category) {
      return toast.error(`All items should have a value`, {
        duration: 1500,
        position: "top-right",
      });
    }
    let detail = details;
    if (!detail) {
      detail = null;
    }
    const product = {
      name,
      stock,
      image,
      price,
      category,
      details: detail,
    };
    await Axios.post(
      `${process.env.REACT_APP_HOSTNAME}/products/addProducts`,
      [product],
      {
        withCredentials: true,
      }
    );
    props.fetchProducts();
    props.closeForm();
    fetcher();
  };
  return (
    <>
      <Toaster />
      <FormControl>
        <TextField
          hiddenLabel
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        ></TextField>
        <TextField
          hiddenLabel
          placeholder="Stock"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
        ></TextField>
        <TextField
          hiddenLabel
          placeholder="Image location"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        ></TextField>
        <TextField
          hiddenLabel
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        ></TextField>
        <TextField
          hiddenLabel
          placeholder="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        ></TextField>
        <TextField
          hiddenLabel
          placeholder="Details"
          value={details}
          onChange={(e) => setDetails(e.target.value)}
        ></TextField>
      </FormControl>
      <Button onClick={handleSubmit}>Save product</Button>
    </>
  );
};
export default AddProduct;
