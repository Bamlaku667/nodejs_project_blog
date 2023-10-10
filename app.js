const express = require("express");
const blogRoutes = require("./routes/blogRoutes");
const authRoutes = require("./routes/authRoutes");
const dotenv = require("dotenv");
const connectToDB = require("./config/db");
const { logger } = require("./utils/logger");
const { query, validationResult } = require("express-validator");

dotenv.config();
// express app
const app = express();

// connect to mongodb & listen for requests
connectToDB()
  .then(() => {
    logger.info("connecting to DB");
    app.listen(process.env.PORT || 3000, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

// register view engine
app.set("view engine", "ejs");

// middleware & static files
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

// routes
app.get("/", (req, res) => {
  res.redirect("/blogs");
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

// app.get("/user", query("person").notEmpty().escape(), (req, res) => {
//   const result = validationResult(req);
//   if (result.isEmpty()) {
//     return res.send(`hello ${req.query.person}`);
//   }

//   res.send({errors: result.array()});
// });
// blog routes

app.use("/blogs", blogRoutes);

// auth routes
app.use("/user", authRoutes);

// 404 page
app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});
