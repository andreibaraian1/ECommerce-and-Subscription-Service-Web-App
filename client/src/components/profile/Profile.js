import Axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {setModal,setModalMessage} from '../../actions';
import styles from './Profile.module.css';
const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [user,setUser] = useState({});
  useEffect(() => {
    Axios.get("http://localhost:3001/users/getUserInfo", {
      withCredentials: true,
    }).then((res) => {
      if(res.data?.error) {
        dispatch(setModal());
        dispatch(setModalMessage(res.data.error));
        navigate("/");
        return;
      } else {
         setUser(res.data)
      }
     });
  }, [dispatch,navigate]);
  return (
    <>
      <div className={styles.body}><p>{user.username}</p></div>
    </>
  );
};
export default Profile;
