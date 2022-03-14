import { useState } from "react";
import Axios from "axios";
const Register = (props) => {
  const [usernameReg, setUsernameReg] = useState("");
  const [passwordReg, setPasswordReg] = useState("");
  const [emailReg, setEmailReg] = useState("");
  const [registerstatus, setRegisterstatus] = useState();
  const register = (event) => {
    event.preventDefault();
    if (
      usernameReg.trim().length === 0 ||
      passwordReg.trim().length === 0 ||
      emailReg.trim().length === 0
    ) {
      setRegisterstatus("Inputs cannot be empty");
      return;
    }
    Axios.post("http://localhost:3001/users/register", {
      username: usernameReg,
      password: passwordReg,
      email: emailReg,
    })
      .then((response) => {
        setRegisterstatus(response.data);
      })
      .catch((error) => {
        setRegisterstatus(error.response.data);
      });
    setEmailReg("");
    setUsernameReg("");
    setPasswordReg("");
  };
  return (
    <div>
      <form onSubmit={register}>
        <h1>Registration</h1>
        <label>Email</label>
        <input
          type="text"
          onChange={(e) => {
            setEmailReg(e.target.value);
            setRegisterstatus();
          }}
          value={emailReg}
        />
        <label>Username</label>
        <input
          type="text"
          onChange={(e) => {
            setUsernameReg(e.target.value);
            setRegisterstatus();
          }}
          value={usernameReg}
        />
        <label>Password</label>
        <input
          type="password"
          onChange={(e) => {
            setPasswordReg(e.target.value);
            setRegisterstatus();
          }}
          value={passwordReg}
        />
        <input type="submit" value="Register" />
      </form>
      <h1>{registerstatus}</h1>
    </div>
  );
};
export default Register;
