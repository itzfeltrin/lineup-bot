const express = require("express");
const path = require("path");
const poster = require("./poster");
const matchRoutes = require("./routes/match");
const { getHour } = require("./util/helpers");

const PORT = process.env.PORT || 3000;

const app = express();
app.set("view engine", "ejs");
app.use(express.static(path.basename(path.dirname("public"))));

app.get("/", (_, res) => {
  res.redirect("/match");
});

app.use("/match", matchRoutes);

app.listen(PORT);

// poster();

// setInterval(() => {
//   poster();
// }, getHour(72));
