const express = require("express");
const nunjucks = require("nunjucks");
var path = require("path");
const app = express();
const PORT = process.env.PORT || 3333;

const routes = require("./routes");

app.use(express.urlencoded({ extended: false }));
app.use("/static", express.static(path.join(__dirname, "/static")));

// configuração da engine render

nunjucks.configure("views", {
  autoescape: true,
  express: app,
  watch: true
});

app.set("view engine", "njk");

app.use(routes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
