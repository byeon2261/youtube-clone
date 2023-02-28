import express from "express";
import gimochi from "morgan";

const app = express();
const logger = gimochi("dev");

const handleHome = (req, res) => {
  return res.send("<h1>hhhhhhh<h1>");
};

app.use(logger);
app.get("/", handleHome);

const PORT = 4000;

const AppListening = () => {
  console.log(`✅ listening server on http://localhost:${PORT} 🚀`);
};

app.listen(PORT, AppListening());
