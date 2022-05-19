import styles from "./Home.module.css";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import background from "../../images/fitness.jpg";
import { useEffect, useState } from "react";
const Home = () => {
  const navigate = useNavigate();
  const [hoursUntilClose, setHoursUntilClose] = useState(0);
  const [minutesUntilClose, setMinutesUntilClose] = useState(0);
  useEffect(() => {
    document.body.style.overflow = "hidden";
    //getCloseHours
    const closeDate = new Date();
    closeDate.setHours(21, 0, 0);
    const now = new Date();
    let minutesUntilClose = (closeDate - now) / 1000 / 60;
    const getTime = () => {
      let hours = 0;
      let minutes = 0;
      if (minutesUntilClose < 0) return;
      while (minutesUntilClose !== 0) {
        if (minutesUntilClose > 60) {
          hours += 1;
          minutesUntilClose -= 60;
        } else {
          minutes += minutesUntilClose;
          minutesUntilClose -= minutes;
        }
      }
      setHoursUntilClose(hours);
      setMinutesUntilClose(Math.floor(minutes));
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
         
           {(hoursUntilClose>0 && minutesUntilClose>0) ?  <h3>Closing in {hoursUntilClose} hours and {minutesUntilClose} minutes</h3> : <h3>Gym is closed. Feel free to check out our shop.</h3> }
          
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
