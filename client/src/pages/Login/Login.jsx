import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
function Login() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth.isAuth);
  console.log(auth);

  const [userLogin, setUserLogin] = useState({
    username: "",
    password: "",
  });

  const postUser = async () => {
    await axios
      .post("/auth/login", userLogin)
      .then((res) => {
        dispatch({ type: "SET_USER", payload: res.data });
        localStorage.setItem("token", res.data.token);
        console.log(JSON.stringify(res.data));
      })
      .catch((err) => {
        console.log(err);
      });

    console.log(auth);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="username pls write :>)"
        onChange={(e) =>
          setUserLogin({ ...userLogin, username: e.target.value })
        }
      />
      <input
        type="password"
        placeholder="password pls write :>)"
        onChange={(e) =>
          setUserLogin({ ...userLogin, password: e.target.value })
        }
      />
      <button onClick={postUser}>Войти</button>
      <Link to="/register">Register</Link>
    </div>
  );
}

export default Login;
