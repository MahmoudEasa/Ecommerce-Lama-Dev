import "./login.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "./../../redux/apiCalls";

const Login = () => {
  const dispatch = useDispatch();
  const { isFetching, error } = useSelector((state) => state.user);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    username === "" && setUsername({ error: "username is require" });
    password === "" && setPassword({ error: "password is require" });

    typeof username === "string" &&
      username &&
      typeof password === "string" &&
      password &&
      login(dispatch, { username, password }).then(() =>
        window.location.reload()
      );
  };

  return (
    <div className="loginContainer">
      <div className="inputContainer">
        <input
          type="text"
          required
          placeholder="username"
          disabled={isFetching}
          onBlur={() =>
            username === "" && setUsername({ error: "username is require" })
          }
          value={typeof username === "string" ? username : ""}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label>{typeof username === "object" && username.error}</label>
      </div>
      <div className="inputContainer">
        <input
          type="password"
          placeholder="password"
          onBlur={() =>
            password === "" && setPassword({ error: "password is require" })
          }
          value={typeof password === "string" ? password : ""}
          disabled={isFetching}
          onChange={(e) => setPassword(e.target.value)}
        />
        <label>{typeof password === "object" && password.error}</label>
      </div>
      {error && <div style={{ color: "red" }}>Something is wrong</div>}
      <button disabled={isFetching} onClick={handleLogin}>
        Login
      </button>
    </div>
  );
};

export default Login;
