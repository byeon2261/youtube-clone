import "./db";
import "./models/Video.js";
import "./models/User.js";
import app from "./server";

const PORT = 4000;

const AppListening = () => {
  console.log(`✅ listening server on http://localhost:${PORT} 🚀`);
};

app.listen(PORT, AppListening());
