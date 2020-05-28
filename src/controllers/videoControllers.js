import routes from "../routes";
import Video from "../models/Video";
import Comment from "../models/Comment";

export const homeCon = async (req, res) => {
  try {
    const videos = await Video.find({}).populate("creator").sort({ _id: -1 });
    // console.log(videos);
    res.render("home", { pageTitle: "Home", videos });
  } catch (error) {
    console.log(error);
    res.render("home", { pageTitle: "Home", videos });
  }
};

export const searchCon = async (req, res) => {
  // const searchingBy = req.query.term;
  const {
    query: { term: searchingBy },
  } = req;
  let videos = [];
  try {
    videos = await Video.find({
      title: { $regex: searchingBy, $options: "i" },
    });
  } catch (error) {
    console.log(error);
  }
  res.render("search", {
    pageTitle: "Search",
    searchingBy,
    videos,
  });
};

export const videosCon = (req, res) =>
  res.render("videos", { pageTitle: "Videos" });

export const getUploadCon = (req, res) =>
  res.render("upload", { pageTitle: "Upload" });

export const postUploadCon = async (req, res) => {
  const {
    body: { title, description },
    file: { location },
  } = req;
  console.log(req.file);
  const newVideo = await Video.create({
    fileUrl: location,
    title,
    description,
    creator: req.user.id,
  });

  // To Do: Upload and save video
  console.log(newVideo);
  req.user.videos.push(newVideo.id);
  req.user.save();
  res.redirect(routes.videos + routes.videoDetail(newVideo.id));
};

export const videoDetailCon = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const video = await Video.findById(id)
      .populate(`creator`)
      .populate(`comments`);

    res.render("videodetail", { pageTitle: video.title, video });
  } catch (error) {
    console.log(error);
    res.redirect(routes.home);
  }
};

export const getEditVideoCon = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const video = await Video.findById(req.params.id);
    res.render("editvideo", { pageTitle: `Edit ${video.title}`, video });
  } catch (error) {
    console.log(error);
    res.redirect(routes.home);
  }
};

export const postEditVideoCon = async (req, res) => {
  const {
    params: { id },
    body: { title, description },
  } = req;
  try {
    await Video.findOneAndUpdate({ _id: id }, { title, description });
    res.redirect(routes.videos + routes.videoDetail(id));
  } catch (error) {
    console.log(error);
    res.redirect(routes.home);
  }
};

export const deleteVideoCon = async (req, res) => {
  const {
    params: { id },
  } = req;

  try {
    const video = await Video.findById(id);
    await Video.findOneAndRemove({ _id: id });
  } catch (error) {
    console.log(error);
  }
  res.redirect(routes.home);
};

// api register video view
export const postRegisterViewCon = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const video = await Video.findById(id);
    video.views += 1;
    video.save();
    res.status(200);
  } catch (error) {
    res.status(400);
    res.end();
  } finally {
    res.end();
  }
};

// api add comment
export const postAddCommentCon = async (req, res) => {
  const {
    params: { id },
    body: { commentttt: comment },
    user,
  } = req;
  try {
    const video = await Video.findById(id);
    const newComment = await Comment.create({
      text: comment,
      creator: user.id,
    });
    video.comments.push(newComment.id);
    user.comments.push(newComment.id);

    // console.log(newComment);
    video.save();
    user.save();
    console.log(user);
  } catch (error) {
    res.status(400);
  } finally {
    res.end();
  }
};

export const postRemoveCommentCon = async (req, res) => {
  const {
    params: { id: commentId },
    body: { videoId },
    user,
  } = req;
  console.log(commentId);
  // delete Comment db
  await Comment.findByIdAndDelete(commentId);
  // delete Video db
  // await Video.updateOne({ _id: videoId }, { $pull: { comments: commentId } });
  // delete User db
  // await User.updateOne({ _id: userId }, { $pull: { comments: commentId } });
};
