import routes from "../routes";

export const homeCon = (req, res) =>
  res.render("home", { pageTitle: "Home", videos });
export const searchCon = (req, res) => {
  // const searchingBy = req.query.term;
  const {
    query: { term: searchingBy },
  } = req;
  res.render("search", {
    pageTitle: "Search",
    searchingBy: searchingBy,
    videos,
  });
};
export const videosCon = (req, res) =>
  res.render("videos", { pageTitle: "Videos" });

export const getUploadCon = (req, res) =>
  res.render("upload", { pageTitle: "Upload" });

export const postUploadCon = (req, res) => {
  const {
    body: { file, title, description },
  } = req;
  // To Do: Upload and save video
  res.redirect(routes.videos + routes.videoDetail(324393));
};

export const videoDetailCon = (req, res) =>
  res.render("videodetail", { pageTitle: "Video Detail" });
export const editVideoCon = (req, res) =>
  res.render("editvideo", { pageTitle: "Edit Video" });
export const deleteVideoCon = (req, res) =>
  res.render("deletevideo", { pageTitle: "Delete Video" });
