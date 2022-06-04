import { Table } from "react-bootstrap";
import { Button, Divider, Select, MenuItem } from "@mui/material";
import { useEffect, useState } from "react";
import Axios from "axios";
import styles from "./AdminOrders.module.css";
const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    fetchOrders();
  }, []);
  const fetchOrders = () => {
    Axios.get(`${process.env.REACT_APP_HOSTNAME}/order/getOrdersAdmin`, {
      withCredentials: true,
    })
      .then((response) => {
        let result = response.data.filter((item) => item.status !== "Canceled");
        // result.sort((a, b) => {
        //   // a.shipping_status.localeCompare(b.shipping_status, "en-us")
        //   if (a > b) {
        //     return -1;
        //   }
        //   if (b > a) {
        //     return 1;
        //   }
        //   return 0;
        // });
        setOrders(result);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleChange = (value, index) => {
    let items = [...orders];
    let item = {
      ...items[index],
      shipping_status: value,
    };
    items[index] = item;
    setOrders(items);
  };
  const handleUpdate = async (id, index) => {
    await Axios.post(
      `${process.env.REACT_APP_HOSTNAME}/order/updateOrder`,
      [
        {
          id,
          shipping_status: orders[index].shipping_status,
        },
      ],
      {
        withCredentials: true,
      }
    );
    fetchOrders();
  };
  const handleDelete = async (index) => {
    await Axios.get(
      `${process.env.REACT_APP_HOSTNAME}/order/deleteOrder/${index}`,
      {
        withCredentials: true,
      }
    );
    fetchOrders();
  };
  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th># User</th>
            <th>Products</th>
            <th>Total</th>
            <th>Shipping info</th>
            <th>Payment status</th>
            <th>Payment id</th>
            <th>Shipping status</th>
            <th>Update</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {orders?.map((order, index) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.id_user}</td>
              <td>
                {order.products?.map((product) => (
                  <div className={styles.productList}>
                    <p>
                      {product.quantity} x {product.name}
                    </p>
                    <p>Price for one : {product.price} lei </p>
                    <Divider />
                  </div>
                ))}
              </td>
              <td>
                <td>{order.total} lei </td>
              </td>

              <td>
                <p>
                  {order.shipping_info.country}
                  -- {order.shipping_info.region}
                  -- {order.shipping_info.city}
                  -- {order.shipping_info.zip}
                </p>
                <p>
                  {order.shipping_info.firstName} {order.shipping_info.lastName}
                </p>
                <p>{order.shipping_info.shippingAddress}</p>
              </td>
              <td>{order.status}</td>
              <td>{order.payment_int}</td>
              <td>
                <Select
                  value={order?.shipping_status ? order.shipping_status : ""}
                  onChange={(e) => {
                    handleChange(e.target.value, index);
                  }}
                >
                  <MenuItem value={"Not shipped yet"}>Not shipped yet</MenuItem>
                  <MenuItem value={"Shipped"}>Shipped</MenuItem>
                  <MenuItem value={"Received"}>Received</MenuItem>
                </Select>
              </td>
              <td>
                <Button onClick={() => handleUpdate(order.id, index)}>
                  Update
                </Button>
              </td>
              <td>
                <Button onClick={() => handleDelete(order.id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};
export default AdminOrders;
