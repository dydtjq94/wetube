import "@babel/polyfill";
import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import passport from "passport";
import session from "express-session";
import path from "path";
import MongoStore from "connect-mongo";
import { localsMiddleWare } from "./middlewares";
import routes from "./routes";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import globalRouter from "./routers/globalRouter";
import apiRouter from "./routers/apiRouter";

import "./passport";

// app으로 express 사용하도록 받아옴
const app = express();

// session 저장
const CookieStore = MongoStore(session);

app.use(helmet());

// pug 설정 (view engine) 수정
app.set(`view engine`, "pug");
app.set("views", path.join(__dirname, "views"));

// upload하고 directory 에서 file을 보내주는 middleware
app.use("/static", express.static(path.join(__dirname, "static")));

// console.log(process.env.PORT);
// console.log(process.env.COOKIE_SECRET);

// middleware
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));

// cookie에서 쭉 내려와서 passport 초기화되고 그 다음에 passport가 제 스스로 쿠키를 들여다봐서 그 쿠키 정보에 해당하는 사용자를 찾아줌
app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: true,
    saveUninitialized: false,
    store: new CookieStore({
      mongooseConnection: mongoose.connection,
    }),
  })
);

app.use(passport.initialize());
app.use(passport.session());

// passport는 자기가 찾은 그 사용자를 req.user로 만들어줌! 그래서 이 순서
app.use(localsMiddleWare);

// router
// / 로 시작
app.use(routes.home, globalRouter);
// /users 로 시작하는 모든 router
app.use(routes.users, userRouter);
// /videos 로 시작하는 모든 router
app.use(routes.videos, videoRouter);
// api router
app.use(routes.api, apiRouter);

export default app;
