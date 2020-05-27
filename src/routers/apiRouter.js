import express from "express";
import routes from "../routes";
import {
  postRegisterViewCon,
  postAddCommentCon,
  postRemoveCommentCon,
} from "../controllers/videoControllers";

const apiRouter = express.Router();

apiRouter.post(routes.registerView, postRegisterViewCon);
apiRouter.post(routes.addComment, postAddCommentCon);
apiRouter.post(routes.removeComment, postRemoveCommentCon);

export default apiRouter;
