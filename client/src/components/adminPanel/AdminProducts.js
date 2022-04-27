import { useEffect, useState } from "react";
import Axios from "axios";
import { Table } from "react-bootstrap";
import { Input, Button } from "@mui/material";
const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [update, setUpdate] = useState(false);
  useEffect(() => {
    Axios.get("http://localhost:3001/products/getProducts")
      .then((response) => {
        const result = response.data.sort((a, b) => a.id - b.id);
        setProducts(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [update]);
  const handleChange = (property, value, index) => {
    let items = [...products];
    let item = {
      ...items[index],
      [property]: value,
    };
    items[index] = item;
    setProducts(items);
  };
  const handleUpdate = async (index) => {
    const product = products[index];
    await Axios.post(
      "http://localhost:3001/products/updateProducts",
      [product],
      {
        withCredentials: true,
      }
    );
    setUpdate((prev) => !prev);
   
  };
  const handleDelete = async (index) => {
    await Axios.get(
      `http://localhost:3001/products/deleteProduct/${index}`,
      {
        withCredentials: true,
      }
    );
    setUpdate((prev) => !prev);
   
  };
  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Stock</th>
            <th>Image location</th>
            <th>Price</th>
            <th>category</th>
            <th>details</th>
            <th>Update</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {products?.map((product, index) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>
                <Input
                  value={product.name}
                  onChange={(e) => {
                    handleChange("name", e.target.value, index);
                  }}
                ></Input>
              </td>
              <td>
                <Input
                  value={product.stock}
                  onChange={(e) => {
                    handleChange("stock", e.target.value, index);
                  }}
                ></Input>
              </td>
              <td>
                <Input
                  value={product.image}
                  onChange={(e) => {
                    handleChange("image", e.target.value, index);
                  }}
                ></Input>
              </td>
              <td>
                <Input
                  value={product.price}
                  onChange={(e) => {
                    handleChange("price", e.target.value, index);
                  }}
                ></Input>
              </td>
              <td>
                <Input
                  value={product.category}
                  onChange={(e) => {
                    handleChange("category", e.target.value, index);
                  }}
                ></Input>
              </td>
              <td>
                <Input
                  value={product.details | undefined}
                  disabled={product.category !== "subscription"}
                  onChange={(e) => {
                    handleChange("details", e.target.value, index);
                  }}
                ></Input>
              </td>
              <td>
                <Button onClick={() => handleUpdate(index)}>Update</Button>
              </td>
              <td>
                <Button onClick={() => handleDelete(product.id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};
export default AdminProducts;
