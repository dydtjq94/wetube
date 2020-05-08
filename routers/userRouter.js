import express from "express";
import routes from "../routes";
import {
  usersCon,
  userDetailCon,
  editProfileCon,
  changePasswordCon,
} from "../controllers/userControllers";

const userRouter = express.Router();

userRouter.get(routes.home, usersCon);
userRouter.get(routes.editProfile, editProfileCon);
userRouter.get(routes.changePassword, changePasswordCon);
userRouter.get(routes.userDetail(), userDetailCon);

export default userRouter;
