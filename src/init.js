import "@babel/polyfill";

// 모델을 추가해줘야함
import "./models/Video";
import "./models/Comment";
import "./models/User";

// default로 export 했으니 이렇게 import 가능
import dotenv from "dotenv";
import "./db";
import app from "./app";

dotenv.config();
// key를 숨기는데 만약 PORT를 못찾으면 4000번으로
const PORT = process.env.PORT || 4000;

const handleListening = () =>
  console.log(`🔥Listening on: http://localhost:${PORT}`);

app.listen(PORT, handleListening);
