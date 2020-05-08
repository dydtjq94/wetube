import express from "express";
import routes from "../routes";
import {
  videosCon,
  videoDetailCon,
  editVideoCon,
  deleteVideoCon,
  getUploadCon,
  postUploadCon,
} from "../controllers/videoControllers";

const videoRouter = express.Router();

videoRouter.get(routes.home, videosCon);
videoRouter.get(routes.upload, getUploadCon);
videoRouter.post(routes.upload, postUploadCon);
videoRouter.get(routes.videoDetail(), videoDetailCon);
videoRouter.get(routes.editVideo, editVideoCon);
videoRouter.get(routes.deleteVideo, deleteVideoCon);

export default videoRouter;
