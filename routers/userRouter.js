import express from "express";
import routes from "../routes";
import {
  usersCon,
  userDetailCon,
  getEditProfileCon,
  changePasswordCon,
  meCon,
  postEditProfileCon,
} from "../controllers/userControllers";
import { onlyPrivate, uploadAvatar } from "../middlewares";

const userRouter = express.Router();

userRouter.get(routes.home, usersCon);
userRouter.get(routes.me, meCon);

userRouter.get(routes.editProfile, onlyPrivate, getEditProfileCon);
userRouter.post(
  routes.editProfile,
  onlyPrivate,
  uploadAvatar,
  postEditProfileCon
);

userRouter.get(routes.changePassword, onlyPrivate, changePasswordCon);
userRouter.get(routes.userDetail(), userDetailCon);

export default userRouter;
