require("dotenv/config");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");

//import routes
const postsRoute = require("./routes/post");

//middleware
app.use(bodyParser.json());
app.use(cors());
app.use("/post", postsRoute);

//routes
app.get("/", (req, res) => {
  res.send("we are on home");
});

mongoose.connect(process.env.DB_CONNECTION, () => console.log("connected"));
// console.log(process.env.DB_CONNECTION)

app.listen(process.env.PORT||3000);
``;
