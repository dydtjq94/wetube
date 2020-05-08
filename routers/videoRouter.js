import express from "express";
import routes from "../routes";
import {
  videosCon,
  videoDetailCon,
  deleteVideoCon,
  getUploadCon,
  postUploadCon,
  getEditVideoCon,
  postEditVideoCon,
} from "../controllers/videoControllers";
import { uploadVideo } from "../middlewares";

const videoRouter = express.Router();

videoRouter.get(routes.home, videosCon);
videoRouter.get(routes.upload, getUploadCon);
videoRouter.post(routes.upload, uploadVideo, postUploadCon);

videoRouter.get(routes.videoDetail(), videoDetailCon);

videoRouter.get(routes.editVideo(), getEditVideoCon);
videoRouter.post(routes.editVideo(), postEditVideoCon);

videoRouter.get(routes.deleteVideo(), deleteVideoCon);

export default videoRouter;
