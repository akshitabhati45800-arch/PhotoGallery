const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
    try {  console.log("AUTH MIDDLEWARE HIT");
        const token = req.headers.authorization.split(" ")[1];

        if (!token) {
            return res.status(401).json({ message: "Token Missing" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = {
           id: decoded.id,
          role: decoded.role
};
        next();
    } 
    catch (error) {
    console.log("JWT ERROR:", error);
    return res.status(401).json({
        message: error.message
    });
}
};

//middleware for role-based authorization
const authorize = (role) => {
    return (req, res, next) => {

        if (req.user.role !== role) {
            return res.status(403).json({
                message: "Access denied"
            });
        }
        next();
    };
};
  
module.exports = {auth,authorize};