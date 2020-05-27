import express from "express";
import passport from "passport";
import routes from "../routes";
import { homeCon, searchCon } from "../controllers/videoControllers";
import {
  getJoinCon,
  postJoinCon,
  getLoginCon,
  postLoginCon,
  logoutCon,
  githubLoginCon,
  postGithubLogIn,
  facebookLoginCon,
  postFacebookLogIn,
  meCon,
} from "../controllers/userControllers";
import { onlyPublic, onlyPrivate } from "../middlewares";

const globalRouter = express.Router();

globalRouter.get(routes.join, onlyPublic, getJoinCon);
globalRouter.post(routes.join, onlyPublic, postJoinCon, postLoginCon);

globalRouter.get(routes.login, onlyPublic, getLoginCon);
globalRouter.post(routes.login, onlyPublic, postLoginCon);

globalRouter.get(routes.home, homeCon);
globalRouter.get(routes.search, searchCon);
globalRouter.get(routes.logout, onlyPrivate, logoutCon);

globalRouter.get(routes.github, githubLoginCon);
globalRouter.get(
  routes.githubCallback,
  passport.authenticate("github", { failureRedirect: "/login" }),
  postGithubLogIn
);

globalRouter.get(routes.facebook, facebookLoginCon);
globalRouter.get(
  routes.facebookCallback,
  passport.authenticate("facebook", { failureRedirect: "/login" }),
  postFacebookLogIn
);

globalRouter.get(routes.me, meCon);

export default globalRouter;
