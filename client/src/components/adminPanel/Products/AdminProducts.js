import { useEffect, useState } from "react";
import Axios from "axios";
import { Table } from "react-bootstrap";
import { Input, Button } from "@mui/material";
import toast, { Toaster } from "react-hot-toast";
import AddProduct from "./AddProduct";

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    Axios.get(`${process.env.REACT_APP_HOSTNAME}/products/getProducts`)
      .then((response) => {
        const result = response.data.sort((a, b) => a.id - b.id);
        setProducts(result);
      })
      .catch((err) => {
        console.log(err);
      });
  };
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
      `${process.env.REACT_APP_HOSTNAME}/products/updateProducts`,
      [product],
      {
        withCredentials: true,
      }
    );
    toast.success(` ${product.name} was updated`, {
      duration: 1500,
      position: "top-right",
    });
    fetchProducts();
  };
  const handleDelete = async (index) => {
    await Axios.get(
      `${process.env.REACT_APP_HOSTNAME}/products/deleteProduct/${index}`,
      {
        withCredentials: true,
      }
    );
    toast.success(`Product deleted`, {
      duration: 1500,
      position: "top-right",
    });
    fetchProducts();
  };
  return (
    <>
      <Toaster />

      {form && (
        <AddProduct
          fetchProducts={fetchProducts}
          closeForm={() => setForm(false)}
        />
      )}
      <Button
        onClick={() => {
          setForm((prev) => !prev);
        }}
      >
        {form ? "Cancel" : "Add Product"}
      </Button>
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
