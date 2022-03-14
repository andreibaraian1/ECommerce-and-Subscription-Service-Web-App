import Axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../../actions";
const Logout = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const getLogout = () => {
    Axios.get("http://localhost:3001/users/logout", {
      withCredentials: true,
    }).then((res) => {
      if (res.status === 200) dispatch(setUser(null));
    });
    // if (logout.status === 200) {
    //   props.setUser();
    // }
    navigate("/");
  };
  //TODO modal for logout
  return (
    <div>
      <h1>Are you sure you want to log out ?</h1>
      <button onClick={getLogout}>Yes</button>
    </div>
  );
};
export default Logout;
