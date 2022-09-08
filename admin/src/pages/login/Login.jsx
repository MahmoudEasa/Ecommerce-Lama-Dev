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
    login(dispatch, { username, password }).then(() =>
      window.location.reload()
    );
  };

  return (
    <div className="loginContainer">
      <input
        type="text"
        placeholder="username"
        disabled={isFetching}
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="password"
        value={password}
        disabled={isFetching}
        onChange={(e) => setPassword(e.target.value)}
      />
      {error && <div style={{ color: "red" }}>Something is wrong</div>}
      <button disabled={isFetching} onClick={handleLogin}>
        Login
      </button>
    </div>
  );
};

export default Login;
