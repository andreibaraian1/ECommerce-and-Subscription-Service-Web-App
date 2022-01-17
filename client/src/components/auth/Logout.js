import Axios from "axios";
import { useNavigate } from "react-router-dom";
const Logout = (props) => {
  const navigate = useNavigate();
  const getLogout = async () => {
    const logout = await Axios.get("http://localhost:3001/logout", {
      withCredentials: true,
    });
    if (logout.status === 200) {
      props.setUser();
    }
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
