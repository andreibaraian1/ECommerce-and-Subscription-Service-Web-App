import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";
const Navbar = (props) => {
  return (
    <div>
      <nav className={styles.nav}>
        <div className={styles.navLeft}>
          <Link className={styles.navbarLink} to="/">
            Home
          </Link>
        </div>
        <div className={styles.navRight}>

          {!props.user  && (
          <div>
            <Link className={styles.navbarLink} to="/login">
              Login
            </Link>
            <Link className={styles.navbarLink} to="/register">
              Register
            </Link>
          </div>
        )}
         {props.user  && (
          <div>
            <Link className={styles.navbarLink} to="/logout">
              Logout
            </Link>
          </div>
        )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
