import axios from "axios";
const auth = async (dispatch) => {
  console.log(localStorage.getItem("token"));
  await axios
    .get("/auth", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
    .then((res) => {
      localStorage.setItem("token", res.data.token);
      dispatch({ type: "SET_USER", payload: res.data });
    })
    .catch((err) => {
      console.log(err);
    });
};

export default auth;
