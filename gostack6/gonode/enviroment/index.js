const express = require("express");
const nunjucks = require("nunjucks");
const app = express();
const PORT = process.env.PORT || 3333;

// renderizar o conteudo da pasta views
nunjucks.configure("views", {
  autoescape: true,
  express: app,
  watch: true
});

app.use(express.urlencoded({ extended: false }));

// extensão que será usada para renderizar os arquivos
// do nunjucks
app.set("view engine", "njk");

const users = ["Joberth", "Robson", "Iguinho roniele"];

app.get("/", (req, res) => {
  return res.render("list", { users });
});

app.post("/create", (req, res) => {
  const { user } = req.body;
  users.push(user);
  res.redirect("/");
});

app.get("/new", (req, res) => {
  return res.render("new");
});

app.listen(PORT, () => {
  console.log(`Server running in port: ${PORT}`);
});
