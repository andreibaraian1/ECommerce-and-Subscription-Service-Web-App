import { useState } from "react";
import Axios from "axios";
const Login = (props) => {
  const [usernameLog, setUsernameLog] = useState("");
  const [passwordLog, setPasswordLog] = useState("");
  const [user, setUser] = useState();
  const [message, setMessage] = useState("");
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      login();
    }
  };

  const login = async (event) => {
    event.preventDefault();
    if (usernameLog.trim().length === 0 || passwordLog.trim().length === 0) {
      return;
    }
    const login = await Axios.post(
      "http://localhost:3001/login",
      {
        username: usernameLog,
        password: passwordLog,
      },
      { withCredentials: true }
    );
    console.log(login);
    if (login.status === 200) {
      setMessage(login.data.message);
    }

    setUsernameLog("");
    setPasswordLog("");
  };
  const me = async () => {
    const me = await Axios.get("http://localhost:3001/me", {
      withCredentials: true,
    });
    // setUser({
    //   username: me.data.username,
    //   id: me.data.id,
    //   role: me.data.role
    // });
    setUser(me.data.user);
    
  };
  //   const userHandler = () => {
  //     return user;
  //   };
  const logout = async () => {
    const logout = await Axios.get("http://localhost:3001/logout", {
      withCredentials: true,
    });
    if (logout.status === 200) {
      setUser();
      setMessage(logout.data.message);
    }
  };
  return (
    <div>
      <form onSubmit={login}>
        <h1>Login</h1>
        <input
          type="text"
          placeholder="Username"
          onChange={(e) => {
            setUsernameLog(e.target.value);
          }}
          onKeyDown={handleKeyDown}
          value={usernameLog}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => {
            setPasswordLog(e.target.value);
          }}
          onKeyDown={handleKeyDown}
          value={passwordLog}
        />
        <button>Login</button>
      </form>
      <button onClick={me}>Me</button>
      <div className="testUser">
        {user && (
          <div>
            <h1>userid:{user.id}</h1>
            <h1>username:{user.username}</h1>
            <h1>role:{user.role}</h1>
          </div>
        )}
      </div>
      <div>
        <button onClick={logout}>Logout</button>
        <h1>{message}</h1>
      </div>
    </div>
  );
};
export default Login;
