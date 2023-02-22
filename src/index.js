import express from "express";

const app = express();

const gossipMiddleware = (req, res, next) => {
  console.log(`I'm in middleware. someone is going to: ${req.url}`);
  next();
};

const handleHome = (req, res) => {
  return res.send("<h1>hhhhhhh<h1>");
};
const handleLogin = (req, res) => {
  return res.send({ message: "login here." });
};
app.get("/", gossipMiddleware, handleHome);
app.get("/login", handleLogin);

const PORT = 4000;

const AppListening = () => {
  console.log(`✅ listening server on http://localhost:${PORT} 🚀`);
};

app.listen(PORT, AppListening());
