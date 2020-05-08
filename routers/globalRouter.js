import express from "express";
import routes from "../routes";
import { homeCon, searchCon } from "../controllers/videoControllers";
import {
  getJoinCon,
  postJoinCon,
  getLoginCon,
  postLoginCon,
  logoutCon,
} from "../controllers/userControllers";

const globalRouter = express.Router();

globalRouter.get(routes.join, getJoinCon);
globalRouter.post(routes.join, postJoinCon);

globalRouter.get(routes.login, getLoginCon);
globalRouter.post(routes.login, postLoginCon);

globalRouter.get(routes.home, homeCon);
globalRouter.get(routes.search, searchCon);
globalRouter.get(routes.logout, logoutCon);

export default globalRouter;
