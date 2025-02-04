const express = require("express");
const mongoose = require("mongoose");
const authRouter = require("./routes/auth");
const cors = require("cors");

const PORT = process.env.PORT | 3001;
const username = encodeURIComponent("hasnainmakada");
const password = encodeURIComponent("Hasnain@123");

const DB_CONNECT = `mongodb+srv://${username}:${password}@cluster0.a3fbatx.mongodb.net/?retryWrites=true&w=majority`;

const app = express();

app.use(express.json());
app.use((req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,PATCH,POST,DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
});
app.use(authRouter);

mongoose
  .connect(DB_CONNECT)
  .then(() => {
    console.log("Connection succesfull");
  })
  .catch((err) => {
    console.log(`Some Error occured while connecting to mongoDB ${err}`);
  });

app.listen(PORT, "0.0.0.0", (req, res) => {
  console.log(`Connected to http://localhost:${PORT}`);
});
