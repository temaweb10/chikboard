const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const authRouter = require("./routes/authRouter");
const testRouter = require("./routes/testRoutes");
const PORT = 3001;
const db = `mongodb+srv://temadev:recomend23@cluster0.n8n92uv.mongodb.net/chicboard?retryWrites=true&w=majority`;
const app = express();

app.use(express.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
const start = async () => {
  try {
    await mongoose
      .connect(db)
      .then(() => console.log("db connect"))
      .catch((err) => console.log(err));

    app.listen(PORT, () => console.log(`SERVER START ON PORT ${PORT}`));
  } catch (err) {
    console.log(err);
  }
};

start();

app.use(authRouter);
app.use(testRouter);
