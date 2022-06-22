import styles from "./Home.module.css";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Axios from "axios";
const Home = () => {
  const navigate = useNavigate();
  const [hoursUntilClose, setHoursUntilClose] = useState(0);
  const [minutesUntilClose, setMinutesUntilClose] = useState(0);
  const [loading, setLoading] = useState(true);
  const [closed, setClosed] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const getTime = async () => {
      const res = await Axios.get(
        `${process.env.REACT_APP_HOSTNAME}/users/getClosingTime`
      );
      setLoading(false);
      if (!res.data.closed) {
        setHoursUntilClose(res.data.hours);
        setMinutesUntilClose(res.data.minutes);
        setClosed(false);
      }
    };
    getTime();
  }, []);

  useEffect(() => {
    if (window.innerWidth <= 550) setIsMobile(true);
  }, []);
  return (
    <>
      <div
        id="main"
        className={styles.main}
        style={{ backgroundImage: `url(images/home.jpg)` }}
      >
        <div className={styles.content}>
          {!loading &&
            (!closed ? (
              <h3>
                Closing in {hoursUntilClose} hours and {minutesUntilClose}{" "}
                minutes
              </h3>
            ) : (
              <h3>Gym is closed. Feel free to check out our shop.</h3>
            ))}

          <h1>POWER GYM</h1>
          <Button
            id="shop"
            style={isMobile ? undefined : { width: 500, height: 70 }}
            size="large"
            variant="contained"
            color="success"
            onClick={() => {
              navigate("/shop");
            }}
          >
            Shop now
          </Button>
        </div>
      </div>
    </>
  );
};
export default Home;
