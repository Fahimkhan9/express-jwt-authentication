const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config({ path: "./config/.env" });
const authRouter = require("./routes/authRoutes");
const app = express();
const port = 5000;

// middleware
app.use(express.static("public"));
// app.use(cors());
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// view engine
app.set("view engine", "ejs");

// database connection
const dbURI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.vigvf.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then((result) => app.listen(port))
  .catch((err) => console.log(err));

// routes
app.get("/", (req, res) => res.render("home"));

app.get("/smoothies", (req, res) => res.render("smoothies"));
app.use(authRouter);
