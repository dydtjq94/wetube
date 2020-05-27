import mongoose from "mongoose";
import dotenv from "dotenv";
// .env 파일 안에 있는 정보 불러오기
dotenv.config();

// 여기서 우리한테 요청하는건 string으로 된 database이다. 어디에 database가 저장되어있는지 알려줌
// 항상 이걸 적는거임 그냥 기본적인 거임 어떤 기능이 아닌
mongoose.connect(
  process.env.PRODUCTION ? process.env.MONGO_URL_PROD : process.env.MONGO_URL,
  {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  }
);

// db랑 몽구스 연결
const db = mongoose.connection;

const handleOpen = () => console.log(`🔥Connected to DB `);
const handleError = () => console.log(`❌Error on DB Connection:${error}`);

db.once("open", handleOpen);
db.on("error", handleError);
