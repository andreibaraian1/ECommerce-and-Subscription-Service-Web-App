import "./App.css";
import { useState } from "react";
import Axios from "axios";
function App() {
  const [usernameReg, setUsernameReg] = useState("");
  const [passwordReg, setPasswordReg] = useState("");
  const [emailReg, setEmailReg] = useState("");
  const [registerstatus, setRegisterstatus] = useState();
  const [usernameLog, setUsernameLog] = useState("");
  const [passwordLog, setPasswordLog] = useState("");
  const [user,setUser]=useState();
  const register = (event) => {
    event.preventDefault();
    Axios.post("http://localhost:3001/register", {
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
  };
  const login = async (event) => {
    event.preventDefault();
    const login = await Axios.post("http://localhost:3001/login", {
      username: usernameLog,
      password: passwordLog,
    });
    const token = login.data.token;

    const verify = await Axios.post("http://localhost:3001/me", {
      token: token,
    });
    
    setUser({
      username: verify.data.username,
      id: verify.data.id,
      role: verify.data.role,
    });
    
  };
  return (
    <div>
      <div>
        <form onSubmit={register}>
          <h1>Registration</h1>
          <label>Email</label>
          <input
            type="text"
            onChange={(e) => {
              setEmailReg(e.target.value);
            }}
          />
          <label>Username</label>
          <input
            type="text"
            onChange={(e) => {
              setUsernameReg(e.target.value);
            }}
          />
          <label>Password</label>
          <input
            type="text"
            onChange={(e) => {
              setPasswordReg(e.target.value);
            }}
          />
          <button>Register</button>
        </form>
        <h1>{registerstatus}</h1>
      </div>
      <div>
        <form onSubmit={login}>
          <h1>Login</h1>
          <input
            type="text"
            placeholder="Username"
            onChange={(e) => {
              setUsernameLog(e.target.value);
            }}
          />
          <input
            type="text"
            placeholder="Password"
            onChange={(e) => {
              setPasswordLog(e.target.value);
            }}
          />
          <button>Login</button>
        </form>
      </div>
      <div className="testUser">
        {user && 
        <div>
            <h1>userid:{user.id}</h1>
            <h1>username:{user.username}</h1>
            <h1>role:{user.role}</h1>
        </div>}</div>
    </div>
  );
}

export default App;
