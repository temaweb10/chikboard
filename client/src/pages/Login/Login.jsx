import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styles from "../Login/Login.module.scss";
function Login() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth.isAuth);
  console.log(auth);

  const [userLogin, setUserLogin] = useState({
    username: "",
    password: "",
  });

  useEffect(() => {
    console.log(userLogin);
  }, [userLogin]);

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
  const theme = createTheme();
  return (
    <div>
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "#1976d2" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Вход
            </Typography>
            <Box noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                label="Никнейм"
                autoFocus
                onChange={(e) =>
                  setUserLogin({ ...userLogin, username: e.target.value })
                }
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="Пароль"
                label="Пароль"
                type="password"
                onChange={(e) =>
                  setUserLogin({ ...userLogin, password: e.target.value })
                }
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={postUser}
              >
                Вход
              </Button>
              <Grid container>
                <Grid item>
                  <Link to="/register" className={styles["login-link"]}>
                    {"Нету аккаунта ? Зарегистрируйся!"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </div>
  );
}

export default Login;
