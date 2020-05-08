import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import { localsMiddleWare } from "./middlewares";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import globalRouter from "./routers/globalRouter";
import routes from "./routes";

//app으로 express 사용하도록 받아옴
const app = express();

//pug 설정 (view engine) 수정
app.set(`view engine`, "pug");

//upload하고 directory 에서 file을 보내주는 middleware
app.use("/uploads", express.static("uploads"));

//middleware
app.use(helmet());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.use(localsMiddleWare);

//router
// / 로 시작
app.use(routes.home, globalRouter);
// /users 로 시작하는 모든 router
app.use(routes.users, userRouter);
// /videos 로 시작하는 모든 router
app.use(routes.videos, videoRouter);

export default app;
