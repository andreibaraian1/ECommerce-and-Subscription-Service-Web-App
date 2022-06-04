import { useEffect, useState } from "react";
import { QrReader } from "react-qr-reader";
import styles from "./QRCheck.module.css";
import Axios from "axios";
import { useDispatch } from "react-redux";
import { setModal, setModalMessage } from "../../../actions";
const QRCheck = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState("");
  useEffect(() => {
    const checkToken = () => {
      Axios.post(
        `${process.env.REACT_APP_HOSTNAME}/users/checkQRToken`,
        { token: data },
        { withCredentials: true }
      ).then((res) => {
        if (res.data.valid) {
          dispatch(setModal());
          dispatch(setModalMessage(res.data.message));
          setTimeout(() => {
            dispatch(setModal());
            dispatch(setModalMessage(""));
            setData("");
          }, "2500");
        }
      });
    };
    checkToken();
  }, [data, dispatch]);
  return (
    <>
      <QrReader
        className={styles.qrReader}
        onResult={(result, error) => {
          if (!!result) {
            setData(result?.text);
          }
          if (!!error) {
            console.info(error);
          }
        }}
        style={{ width: "20%" }}
      />
    </>
  );
};
export default QRCheck;
