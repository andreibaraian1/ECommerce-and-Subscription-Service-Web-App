import styles from "./Home.module.css";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import background from "../../images/fitness.jpg";
import { useEffect, useState } from "react";
import Axios from "axios";
const Home = () => {
  const navigate = useNavigate();
  const [hoursUntilClose, setHoursUntilClose] = useState(0);
  const [minutesUntilClose, setMinutesUntilClose] = useState(0);
  const [closed, setClosed] = useState(true);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const getTime = async () => {
      const res = await Axios.get("http://localhost:3001/users/getClosingTime");
      if (!res.data.closed) {
        setHoursUntilClose(res.data.hours);
        setMinutesUntilClose(res.data.minutes);
        setClosed(false);
      }
    };
    getTime();
  }, []);
  return (
    <>
      <div
        id="main"
        className={styles.main}
        style={{ backgroundImage: `url(${background})` }}
      >
        <div className={styles.content}>
          {!closed ? (
            <h3>
              Closing in {hoursUntilClose} hours and {minutesUntilClose} minutes
            </h3>
          ) : (
            <h3>Gym is closed. Feel free to check out our shop.</h3>
          )}

          <h1>POWER GYM</h1>
          <Button
            style={{ width: 500, height: 70 }}
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
