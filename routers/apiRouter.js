import express from "express";
import routes from "../routes";
import {
  postRegisterViewCon,
  postAddCommentCon,
} from "../controllers/videoControllers";

const apiRouter = express.Router();

apiRouter.post(routes.registerView, postRegisterViewCon);
apiRouter.post(routes.addComment, postAddCommentCon);

export default apiRouter;
