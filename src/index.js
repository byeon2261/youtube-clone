import express from "express";

const app = express();

const PORT = 4000;

const AppListening = () => {
  console.log(`listening server on http://localhost:${PORT} 🚀`);
};

app.listen(PORT, AppListening());
