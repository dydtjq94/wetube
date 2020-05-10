import routes from "../routes";
import Video from "../models/Video";

export const homeCon = async (req, res) => {
  try {
    const videos = await Video.find({}).sort({ _id: -1 });
    res.render("home", { pageTitle: "Home", videos });
  } catch (error) {
    console.log(error);
    res.render("home", { pageTitle: "Home", videos });
  }
};

export const searchCon = async (req, res) => {
  // const searchingBy = req.query.term;
  const {
    query: { term: searchingBy2 },
  } = req;
  let videos = [];
  try {
    videos = await Video.find({
      title: { $regex: searchingBy2, $options: "i" },
    });
  } catch (error) {
    console.log(error);
  }
  res.render("search", {
    pageTitle: "Search",
    searchingBy: searchingBy2,
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
    file: { path },
  } = req;
  const newVideo = await Video.create({
    fileUrl: path,
    title,
    description,
  });
  // To Do: Upload and save video
  console.log(newVideo);
  res.redirect(routes.videos + routes.videoDetail(newVideo.id));
};

export const videoDetailCon = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const video = await Video.findById(id);
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
    console.log(id);
    const video = await Video.findById(id);
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
    await Video.findOneAndRemove({ _id: id });
  } catch (error) {
    console.log(error);
  }
  res.redirect(routes.home);
};
