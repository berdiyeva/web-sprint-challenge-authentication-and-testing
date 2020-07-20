const jwt = require("jsonwebtoken");
const Users = require("../auth/auth-model");

/* 
  complete the middleware code to check if the user is logged in
  before granting access to the next middleware/route handler
*/

module.exports = async (req, res, next) => {
	try {
		const token = req.headers.token.split("")[1];
		req.token = token;

		if (!token) {
			return res.status(401).json({ message: "Missing token!" });
		}

		jwt.verify(token, process.env.JWT_SECRET, (err, decodePayload) => {
			//   if (err) {
			// 	return res.status(403).json({ message: "Invalid access token." });
			//   }

			req.user = decodePayload;

			next();
		});
	} catch (err) {
		res.status(401).json({ you: "shall not pass!" });
	}
};
