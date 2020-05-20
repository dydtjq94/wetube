import multer from "multer";
import routes from "./routes";

const multerVideo = multer({ dest: `uploads/videos/` });
const multerAvatar = multer({ dest: `uploads/avatars/` });

// 이 과정은 res.locals.siteName, routes 등등 모든 곳에 글로벌 변수를 사용하게 하기 위함이다 (pug 포함)
export const localsMiddleWare = (req, res, next) => {
  res.locals.siteName = "YongTube";
  res.locals.routes = routes;
  // user가 존재하거나, 아니면 존재하지 않다면 비어있는 object를 주도록 설정
  res.locals.loggedUser = req.user || null;
  // console.log(req.user);
  next();
};

// 로그인 한 유저는 접속하지 못하게하는 미들웨어
export const onlyPublic = (req, res, next) => {
  if (req.user) {
    res.redirect(routes.home);
  } else {
    next();
  }
};

// 로그인 한 유저만 접속가능하게 하는 미들웨어
export const onlyPrivate = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.redirect(routes.home);
  }
};

export const uploadVideo = multerVideo.single(`videoFile`);
export const uploadAvatar = multerAvatar.single(`avatar`);
