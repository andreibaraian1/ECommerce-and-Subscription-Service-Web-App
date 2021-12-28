import { useState } from "react";
import Axios from "axios";
const Login = (props) => {
  const [usernameLog, setUsernameLog] = useState("");
  const [passwordLog, setPasswordLog] = useState("");
  const [user, setUser] = useState();
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
    Axios.post(
      "http://localhost:3001/login",
      {
        username: usernameLog,
        password: passwordLog,
      },
      { withCredentials: true }
    );

    const verify = await Axios.get("http://localhost:3001/me", {
      withCredentials: true,
    });
    setUser({
      username: verify.data.username,
      id: verify.data.id,
      role: verify.data.role,
    });
    setUsernameLog("");
    setPasswordLog("");
  };
  //   const userHandler = () => {
  //     return user;
  //   };
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
      <div className="testUser">
        {user && (
          <div>
            <h1>userid:{user.id}</h1>
            <h1>username:{user.username}</h1>
            <h1>role:{user.role}</h1>
          </div>
        )}
      </div>
    </div>
  );
};
export default Login;
