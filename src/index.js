import express from "express";

const app = express();

const logger = (req, res, next) => {
  console.log(`${req.method}: ${req.url}`);
  next();
};

const privateMiddleware = (req, res, next) => {
  const url = req.url;
  if (url === "/private") {
    console.log("user coming to private url.");
    return res.send("Not Allowed.");
  }
  console.log("insert success.");
  next();
};

const handleHome = (req, res) => {
  return res.send("<h1>hhhhhhh<h1>");
};
const privatePage = (req, res) => {
  return res.send("I'm private page");
};
app.use(logger);
app.use(privateMiddleware);
app.get("/", handleHome);
app.get("/private", privatePage);

const PORT = 4000;

const AppListening = () => {
  console.log(`✅ listening server on http://localhost:${PORT} 🚀`);
};

app.listen(PORT, AppListening());
