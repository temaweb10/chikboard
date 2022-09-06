import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function Registration() {
  const [userLogin, setUserLogin] = useState({
    username: "",
    password: "",
  });

  const auth = useSelector((state) => state.auth.isAuth);
  console.log(auth);

  useEffect(() => {
    console.log(userLogin);
  }, [userLogin]);

  const postUser = () => {
    axios
      .post("/auth/regisration", userLogin)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  };
  return (
    <div>
      {" "}
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
      <button onClick={postUser}>Зарегистрироваться</button>
    </div>
  );
}

export default Registration;
