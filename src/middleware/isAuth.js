const isAuth = (req, res, next) => {
  if (req.session.username) {
    return next();
  }
  res.redirect("/login");
};

export default isAuth;
