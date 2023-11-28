import User from "../models/User";
import fetch from "node-fetch";
import bcrypt from "bcrypt";
import { async } from "regenerator-runtime";

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
      avatarUrl: "uploads/avatars/default.jpg",
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

export const postEdit = (req, res) => {};

export const remove = (req, res) => res.send("remove User");
export const getLogin = (req, res) =>
  res.render("login", { pageTitle: "Login" });
export const postLogin = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username, socialOnly: false });
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
  // req.flash("info", "Good bye!");
  req.session.destroy();
  return res.redirect("/");
};

export const getUserProfile = (req, res) => {
  return res.render("edit-profile", { pageTitle: "My profile" });
};
export const postUserProfile = async (req, res) => {
  const {
    session: {
      user: { _id, avatarUrl, email: sessionEmail, username: sessionUsername },
    },
    file,
    body: { name, email, username, location },
  } = req;
  let searchParams = [];
  if (email != sessionEmail) {
    searchParams.push({ email });
  }
  if (username != sessionUsername) {
    searchParams.push({ username });
  }
  if (searchParams.length > 0) {
    const findUser = await User.findOne({ $or: searchParams });
    if (findUser && findUser._id.toString !== _id) {
      const emailExist = await User.exists({ email });
      const usernameExist = await User.exists({ username });
      return res.render("edit-profile", {
        pageTitle: "My profile",
        errorEmail: emailExist ? "Email already exist." : "",
        errorUsername: usernameExist ? "Username already exist." : "",
        // 변경하던 데이터 다시 보내주기
        name,
        email,
        username,
        location,
        //
      });
    }
  }
  const updatedUser = await User.findByIdAndUpdate(
    _id,
    {
      avatarUrl: file ? file.path : avatarUrl,
      name,
      email,
      username,
      location,
    },
    { new: true }
  );
  req.session.user = updatedUser;
  req.flash("succes", "Modified is done.");
  return res.redirect("/users/edit-profile");
};

export const getChangePassword = (req, res) => {
  return res.render("users/change-password", { pageTitle: "Change Password" });
};

export const postChangePassword = async (req, res) => {
  const pageTitle = "Change Password";
  const {
    session: {
      user: { _id },
    },
    body: { oldPassword, newPassword, newPasswordConform },
  } = req;
  const user = await User.findById(_id);
  const ok = await bcrypt.compare(oldPassword, user.password);
  if (!ok) {
    return res.status(400).render("users/change-password", {
      pageTitle,
      errorMessage: "The current password is incorrect.",
    });
  }
  if (newPassword !== newPasswordConform) {
    return res.status(400).render("users/change-password", {
      pageTitle,
      errorMessage: "The Password doesn't match the confirmation.",
    });
  }

  user.password = newPassword;
  await user.save();
  req.session.user.password = user.password;
  return res.redirect("/users/edit-profile");
};

export const StartGithubLogin = (req, res) => {
  const baseUrl = "https://github.com/login/oauth/authorize";
  const config = {
    client_id: process.env.GH_CLIENT,
    allow_signup: false,
    scope: "read:user user:email",
  };
  const params = new URLSearchParams(config).toString();
  const finalUrl = `${baseUrl}?${params}`;
  console.log(finalUrl);
  return res.redirect(finalUrl);
};

export const FinishGithubLogin = async (req, res) => {
  const baseUrl = "https://github.com/login/oauth/access_token";
  const config = {
    client_id: process.env.GH_CLIENT,
    client_secret: process.env.GH_SECRIT,
    code: req.query.code,
  };
  const params = new URLSearchParams(config).toString();
  const finalUrl = `${baseUrl}?${params}`;
  const tokenRequest = await (
    await fetch(finalUrl, {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
    })
  ).json();
  console.log(tokenRequest);
  if ("access_token" in tokenRequest) {
    const { access_token } = tokenRequest;
    const apiUrl = "https://api.github.com";
    const userRequest = await (
      await fetch(`${apiUrl}/user`, {
        headers: {
          Authorization: `token ${access_token}`,
        },
      })
    ).json();
    console.log(userRequest);
    const emailRequest = await (
      await fetch(`${apiUrl}/user/emails`, {
        headers: {
          Authorization: `token ${access_token}`,
        },
      })
    ).json();
    const emailObj = emailRequest.find(
      (email) => email.primary === true && email.verified === true
    );
    console.log(emailObj);
    if (!emailObj) {
      return res.redirect("login");
    }
    let user = await User.findOne({ email: emailObj.email });
    if (!user) {
      user = await User.create({
        socialOnly: true,
        avatarUrl: userRequest.avatar_url,
        username: userRequest.login,
        password: "",
        name: userRequest.name,
        email: emailObj.email,
        location: userRequest.location,
      });
    }
    req.session.loggedIn = true;
    req.session.user = user;
    req.flash("info", "hello!");
    return res.redirect("/");
  } else {
    return res.redirect("login");
  }
};

export const see = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);
  if (!user) {
    return res.status(404).render("notFound", { pageTitle: "User not found." });
  }
  return res.render("users/profile", { pageTitle: user.name, user });
};
