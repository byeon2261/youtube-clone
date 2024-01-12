import mongoose from "mongoose";

mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true, // unique를 사용하면 경고문이 콘솔에서 안나오도록 적용
});

const db = mongoose.connection;

db.on("error", (error) => console.log("❌ DB error >>>: ", error));
db.once("open", () => console.log("✅ Connected to DB"));
