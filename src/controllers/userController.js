import User from "../models/User";
import bcrypt from "bcrypt";

export const getJoin = (req, res) => res.render("join", { pageTitle: "Join" });
export const postJoin = async (req, res) => {
  const { name, email, username, password, password2, location } = req.body;
  const pageTitle = "Join";

  if (password !== password2) {
    return res.status(400).render("join", {
      pageTitle,
      errorMessage: "Password confirmation does not match.",
    });
  }

  const usernameExists = await User.exists({ username });
  if (usernameExists) {
    return res.status(400).render("join", {
      pageTitle,
      errorMessage: "Username is already taken.",
    });
  }
  const emailExists = await User.exists({ email });
  if (emailExists) {
    return res.status(400).render("join", {
      pageTitle,
      errorMessage: "Email is already taken.",
    });
  }

  try {
    await User.create({
      name,
      email,
      username,
      password,
      location,
    });
  } catch (error) {
    return res.status(400).render("join", {
      pageTitle: "Join",
      errorMessage: error._message,
    });
  }

  req.flash("success", "Create user.");
  return res.redirect("/login");
};
export const edit = (req, res) => res.send("Edit User");
export const remove = (req, res) => res.send("remove User");
export const getLogin = (req, res) =>
  res.render("login", { pageTitle: "Login" });
export const postLogin = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  const pageTitle = "Login";
  if (!user) {
    return res.status(400).render("login", {
      pageTitle,
      errorMessage: "An account with this username doesn't exist.",
    });
  }
  const ok = bcrypt.compare(password, user.password);
  if (!ok) {
    return res.render("login", {
      pageTitle,
      errorMessage: "Wrong password.",
    });
  }
  req.session.loggedIn = true;
  req.session.user = user;
  console.log("❇️ Log user in.", username);
  req.flash("info", "Hello!");
  return res.redirect("/");
};
export const logout = (req, res) => {
  req.session.destroy();
  // req.flash("info", "Good bye!");
  return res.redirect("/");
};

export const getUserProfile = (req, res) => {
  return res.render("edit-profile", { pageTitle: "Edit user profile" });
};
export const postUserProfile = async (req, res) => {
  const {
    session: {
      user: { _id, avatarUrl },
    },
    file,
  } = req;
  const updatedUser = await User.findByIdAndUpdate(_id, {
    avatarUrl: file ? file.path : avatarUrl,
  });
  req.session.user = updatedUser;
  req.flash("succes", "Modified is done.");
  return res.redirect("/users/edit-profile");
};

export const githubStart = (req, res) => {
  const baseUrl = "https://github.com/login/oauth/authorize";
  const config = {
    client_id: "94cf88c350148b7acec6",
    allow_signup: "false",
    scope: "read:user user:email",
  };
  const params = new URLSearchParams(config).toString();
  return res.redirect(`${baseUrl}?${params}`);
};

export const githubFinish = (req, res) => {
  req.flash("info", "hello!");
  return res.redirect("/");
};

export const see = (req, res) => req.send("see User");
