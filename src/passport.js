import passport from "passport";
import GithubStratgy from "passport-github";
import FacebookStratgy from "passport-facebook";
import User from "./models/User";
import {
  githubLoginCallbackCon,
  facebookLoginCallbackCon,
} from "./controllers/userControllers";
import routes from "./routes";

// passport에게 strategy를 하나 사용해! 라고 말하기
passport.use(User.createStrategy());

// 깃헙 로그인 (돌아오는 과정)
passport.use(
  new GithubStratgy(
    {
      clientID: process.env.GH_ID,
      clientSecret: process.env.GH_SECRET,
      callbackURL: `https://agile-beyond-95229.herokuapp.com/${routes.githubCallback}`,
    },
    githubLoginCallbackCon
  )
);

passport.use(
  new FacebookStratgy(
    {
      clientID: process.env.FB_ID,
      clientSecret: process.env.FB_SECRET,
      callbackURL: `http://localhost:4000${routes.facebookCallback}`,
      profileFields: [`id`, `displayName`, `photos`, `email`],
      scope: [`public_profile`, `email`],
    },
    facebookLoginCallbackCon
  )
);

// passport야 쿠키에는 오직 user.id만 담아서 보내!
passport.serializeUser(User.serializeUser());

// 그 id 사용자가 누군지 찾아줘!
passport.deserializeUser(User.deserializeUser());
