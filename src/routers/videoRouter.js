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
import { uploadVideo, onlyPrivate } from "../middlewares";

const videoRouter = express.Router();

videoRouter.get(routes.home, videosCon);
videoRouter.get(routes.upload, onlyPrivate, getUploadCon);
videoRouter.post(routes.upload, onlyPrivate, uploadVideo, postUploadCon);

videoRouter.get(routes.videoDetail(), videoDetailCon);

videoRouter.get(routes.editVideo(), onlyPrivate, getEditVideoCon);
videoRouter.post(routes.editVideo(), onlyPrivate, postEditVideoCon);

videoRouter.get(routes.deleteVideo(), onlyPrivate, deleteVideoCon);

export default videoRouter;
