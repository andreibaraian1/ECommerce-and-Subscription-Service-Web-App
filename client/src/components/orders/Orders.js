import { useEffect, useState } from "react";
import Axios from "axios";
import styles from "./Orders.module.css";
import { Table } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { setModal, setModalMessage } from "../../actions";
import { useNavigate } from "react-router-dom";

const Orders = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    const getOrders = async () => {
      const result = await Axios.get("http://localhost:3001/order/getOrders", {
        withCredentials: true,
      });
      setOrders(result.data);
      if (result?.data?.error) {
        dispatch(setModal());
        dispatch(setModalMessage(result.data.error));
        navigate("/");
      }
    };
    getOrders();
  },[dispatch,navigate]);

  return (
    <div className={styles.orders}>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Products</th>
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
                <td>{order.total} lei</td>
              </tr>
            ))}
        </tbody>
      </Table>
    </div>
  );
};
export default Orders;
