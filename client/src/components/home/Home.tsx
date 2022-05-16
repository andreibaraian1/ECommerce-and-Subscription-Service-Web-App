import styles from "./Home.module.css";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import background from "../../images/fitness.jpg";
import { useEffect } from "react";
const Home = () => {
  const navigate = useNavigate();
  useEffect(() => {
    document.body.style.overflow = "hidden";
  }, []);
  return (
    <>
      <div
        id="main"
        className={styles.main}
        style={{ backgroundImage: `url(${background})` }}
      >
        <div className={styles.content}>
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
