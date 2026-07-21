const { getUser } = require("../sevice/auth");

function checkForAuthentication(req, res, next) {

  const tokenCookie = req.cookies?.token;
  req.user = null;

  if(!tokenCookie) return next()

  // const token = authorizationHeaderValue.split(" Bearer ")[1];
  const token = tokenCookie;
  const user = getUser(token);
  req.user = user;
  return next();
}


function restriction(roles){
  return function(req, res, next){
    if(!req.user) return res.redirect("/login");

    if(!roles.includes(req.user.role)) return res.end("Unauthorized")

      return next()
  }
}
module.exports = { checkForAuthentication, restriction };