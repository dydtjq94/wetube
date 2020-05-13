import multer from "multer";
import routes from "./routes";

const multerVideo = multer({ dest: `uploads/videos/` });

// 이 과정은 res.locals.siteName, routes 등등 모든 곳에 글로벌 변수를 사용하게 하기 위함이다 (pug 포함)
export const localsMiddleWare = (req, res, next) => {
  res.locals.siteName = "YongTube";
  res.locals.routes = routes;
  res.locals.user = {
    isAuthenticated: true,
    id: 1,
  };
  next();
};

export const uploadVideo = multerVideo.single(`videoFile`);
