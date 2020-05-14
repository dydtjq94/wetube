import passport from "passport";
import routes from "../routes";
import User from "../models/User";

export const getJoinCon = (req, res) => {
  res.render("join", { pageTitle: "Join" });
};
export const postJoinCon = async (req, res, next) => {
  console.log(req.body);
  const {
    body: { name, email, password, password2 },
  } = req;
  if (password !== password2) {
    res.status(400);
    res.render("join", { pageTitle: "Join" });
  } else {
    // To Do: Register User
    try {
      const user = await User({
        name,
        email,
      });

      await User.register(user, password);
      next();
    } catch (error) {
      console.log(error);
      res.redirect(routes.home);
    }
    // To Do: Log user in
  }
};

export const getLoginCon = (req, res) =>
  res.render("login", { pageTitle: "Login" });

export const postLoginCon = passport.authenticate("local", {
  failureRedirect: routes.login,
  successRedirect: routes.home,
});

// github 으로 보내는 것
export const githubLoginCon = passport.authenticate("github");

// github login function (cb는 passport로부터 우리에게 제공되는 것) 돌아오게 하는것
export const githubLoginCallbackCon = async (
  accessToken,
  refreshToken,
  profile,
  cb
) => {
  const {
    _json: { id, avatar_url, name, email },
  } = profile;
  console.log(profile);
  try {
    const user = await User.findOne({ email });
    if (user) {
      user.githubId = id;
      user.save();
      return cb(null, user);
    }
    const newUser = await User.create({
      email,
      name,
      githubId: id,
      avatarUrl: avatar_url,
    });

    console.log(newUser);
    return cb(null, newUser);
  } catch (error) {
    return cb(error);
  }
};

export const postGithubLogIn = (req, res) => {
  res.redirect(routes.home);
};

// facebook 로그인 설정 (fb로 보내는 것)
export const facebookLoginCon = passport.authenticate("facebook");

// facebook login function (cb는 passport로부터 우리에게 제공되는 것) 돌아오게 하는것
export const facebookLoginCallbackCon = async (
  accessToken,
  refreshToken,
  profile,
  cb
) => {
  console.log(accessToken, refreshToken, profile, cb);
};

export const postFacebookLogIn = (req, res) => {
  res.redirect(routes.home);
};

export const logoutCon = (req, res) => {
  // To Do: Process Log Out
  req.logout();
  res.redirect(routes.home);
};

export const meCon = (req, res) => {
  res.render("userdetail", { pageTitle: "My Profil", user: req.user });
};

export const usersCon = (req, res) => res.render("user", { pageTitle: "User" });

export const getEditProfileCon = (req, res) =>
  res.render("editprofile", { pageTitle: "Edit Profile" });

export const postEditProfileCon = async (req, res) => {
  const {
    body: { name, email },
    file,
  } = req;
  try {
    await User.findByIdAndUpdate(req.user.id, {
      name,
      email,
      avatarUrl: file ? file.path : req.user.avatarUrl,
    });
    res.redirect(routes.users + routes.me);
  } catch (error) {
    console.log(error);
    res.render("editProfile", { pageTitle: "Edit Profile" });
  }
};

export const userDetailCon = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const users = await User.findById(id);
    res.render("userdetail", { pageTitle: "User Detail" });
  } catch (error) {
    console.log(error);
    res.redirect(routes.home);
  }
};

export const changePasswordCon = (req, res) =>
  res.render("changepassword", { pageTitle: "Change Password" });
