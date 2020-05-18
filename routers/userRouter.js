import express from "express";
import routes from "../routes";
import {
  usersCon,
  userDetailCon,
  getEditProfileCon,
  postEditProfileCon,
  getChangePasswordCon,
  postChangePasswordCon,
} from "../controllers/userControllers";
import { onlyPrivate, uploadAvatar } from "../middlewares";

const userRouter = express.Router();

userRouter.get(routes.home, usersCon);

userRouter.get(routes.editProfile, onlyPrivate, getEditProfileCon);
userRouter.post(
  routes.editProfile,
  onlyPrivate,
  uploadAvatar,
  postEditProfileCon
);

userRouter.get(routes.changePassword, onlyPrivate, getChangePasswordCon);
userRouter.post(routes.changePassword, onlyPrivate, postChangePasswordCon);
userRouter.get(routes.userDetail(), userDetailCon);

export default userRouter;
