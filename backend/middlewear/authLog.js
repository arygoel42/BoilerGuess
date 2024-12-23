const jwt = require("jsonwebtoken");

async function authLog(req, res, next) {
  // Check for Passport authentication
  if (req.isAuthenticated()) {
    return next(); // Proceed to the next middleware/route if authenticated
  }

  // Check for a token in the request body
  const token = req.body.token;
  console.log(token);

  if (!token) {
    console.log("failed2");
    return res.status(404).send({ message: "No token received" });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWTKEY);
    console.log(decoded);
    req.user = decoded; // Attach decoded token data to `req.user`
    next(); // Proceed to the next middleware/route
  } catch (error) {
    console.log("failed");
    // Token is invalid or verification failed
    res.status(401).send({ message: "User not validated" });
  }
}

module.exports = authLog;
