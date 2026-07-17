const { getUser } = require("../sevice/auth");

// --> for bearer (Authorization)
function checkForAuthentication(req, res, next) {
  // const authorizationHeaderValue = req.headers["Authorization"]; --> for bearer
  // if (
  //   !authorizationHeaderValue ||
  //   !authorizationHeaderValue.startsWith("Bearer")
  // )
    // return next();
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

// ********* the following 2 function should be removed if upper one is working ********************

// async function restrictToLoggedInUser(req, res, next) {
//   // const userUid = req.cookies?.uid; --> For Cookies
//   const userUid = req.headers["authorization"]; // --> for bearer

//   if (!userUid) return res.redirect("/login");

//   const token = userUid.split("Bearer ")[1]; // --> for bearer
//   const user = getUser(token); // --> for bearer

//   // const user = getUser(userUid); --> For cookies

//   if (!user) return res.redirect("/login");

//   req.user = user;
//   next();
// }

// async function checkAuth(req, res, next) {
//   // const userUid = req.cookies?.uid; --> For cookies
//   // const user = getUser(userUid); --> For cookies

//   const userUid = req.headers["authorization"]; // --> for bearer
//   const token = userUid.split("bearer ")[1]; // --> for bearer
//   const user = getUser(token); // --> for bearer

//   req.user = user;
//   next();
// }

// module.exports = { restrictToLoggedInUser, checkAuth };

