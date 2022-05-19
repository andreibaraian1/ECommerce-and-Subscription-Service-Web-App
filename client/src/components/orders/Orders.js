import { useEffect, useState } from "react";
import Axios from "axios";
import styles from "./Orders.module.css";
import { Table } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { setModal, setModalMessage } from "../../actions";
import { useNavigate } from "react-router-dom";
import { FormControlLabel, Checkbox } from "@mui/material";
const Orders = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [allOrders, setAllorders] = useState([]);
  const [hideCanceled, setHideCanceled] = useState(true);
  useEffect(() => {
    document.body.style.overflow = "visible";
    const getOrders = async () => {
      const result = await Axios.get("http://localhost:3001/order/getOrders", {
        withCredentials: true,
      });
      setAllorders(result.data);
      setOrders(result.data);
      if (result?.data?.error) {
        dispatch(setModal());
        dispatch(setModalMessage(result.data.error));
        navigate("/");
      }
    };
    getOrders();
  }, [dispatch, navigate]);
  useEffect(() => {
    if (hideCanceled) {
      const filtered = allOrders.filter((order) => {
        return order.status !== "Canceled";
      });
      setOrders(filtered);
    } else {
      setOrders(allOrders);
    }
  }, [allOrders, hideCanceled]);
  return (
    <div className={styles.body}>
      <FormControlLabel
        control={
          <Checkbox
            checked={hideCanceled}
            onChange={() => setHideCanceled((prev) => !prev)}
          />
        }
        label="Hide Canceled"
      />
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Products</th>
            <th>Shipping info</th>
            <th>Status</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {orders.length > 0 &&
            orders?.map((order) => (
              <tr key={order.id} className={styles.order}>
                <td>{order.id}</td>
                <td className={styles.products}>
                  {order.products?.map((product) => (
                    <div key={product.id}>
                      <ul className={styles.product}>
                        <li> {product.name}</li>
                        <li>quantity:{product.quantity}</li>
                        <li>{product.price * product.quantity} lei</li>
                      </ul>
                    </div>
                  ))}
                </td>
                <td>
                  <p>{order.shipping_info.city}</p>
                  <p>{order.shipping_info.region}</p>
                  <p> {order.shipping_info.country}</p>
                  <p> {order.shipping_info.shippingAddress}</p>
                  <p>
                    {order.shipping_info.lastName}{" "}
                    {order.shipping_info.firstName}
                  </p>
                </td>
                <td>{order.status}</td>
                <td>{order.total} lei</td>
              </tr>
            ))}
        </tbody>
      </Table>
    </div>
  );
};
export default Orders;
