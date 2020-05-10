import routes from "../routes";

export const getJoinCon = (req, res) => {
  res.render("join", { pageTitle: "Join" });
};
export const postJoinCon = (req, res) => {
  console.log(req.body);
  const {
    body: { name, email, password, password2 },
  } = req;
  if (password !== password2) {
    res.status(400);
    res.render("join", { pageTitle: "Join" });
  } else {
    // To Do: Register User
    // To Do: Log user in
    res.redirect(routes.home);
  }
};

export const getLoginCon = (req, res) =>
  res.render("login", { pageTitle: "Login" });

export const postLoginCon = (req, res) => {
  res.redirect(routes.home);
};

export const logoutCon = (req, res) => {
  // To Do: Process Log Out
  res.redirect(routes.home);
};

export const usersCon = (req, res) => res.render("user", { pageTitle: "User" });
export const editProfileCon = (req, res) =>
  res.render("editprofile", { pageTitle: "Edit Profile" });
export const userDetailCon = (req, res) =>
  res.render("userdetail", { pageTitle: "User Detail" });
export const changePasswordCon = (req, res) =>
  res.render("changepassword", { pageTitle: "Change Password" });
