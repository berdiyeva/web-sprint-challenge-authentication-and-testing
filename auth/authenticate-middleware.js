const jwt = require("jsonwebtoken");

/* 
  complete the middleware code to check if the user is logged in
  before granting access to the next middleware/route handler
*/

module.exports = (req, res, next) => {
	try {
		const token = req.headers.token.split("")[1];
		if (!token) {
			return res.status(401).json({ message: "Missing token!" });
		}

		jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
			// if (err) {
			// 	return res.sendStatus(403);
			// }
			req.user = user;
			next();
		});
	} catch (err) {
		res.status(401).json({ you: "shall not pass!" });
	}
};
