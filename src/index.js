import express from "express";

const app = express();

const handleHome = (req, res) => {
  return res.send("hhhhhhh");
};
const handleLogin = (req, res) => {
  return res.send("login here.");
};
app.get("/", handleHome);
app.get("/login", handleLogin);

const PORT = 4000;

const AppListening = () => {
  console.log(`✅ listening server on http://localhost:${PORT} 🚀`);
};

app.listen(PORT, AppListening());
