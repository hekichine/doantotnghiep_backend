import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const key = process.env.KEYACCESS;

const middleWareController = {
  // verify token
  verifyToken: (req, res, next) => {
    let token = req.headers.token;
    if (token) {
      // ex: ABC tasdhasdas => tasdgasdas
      let accessToken = token.split(" ")[1];
      jwt.verify(accessToken, key, (err, user) => {
        if (err) {
          res.status(403).json({
            message: "Token is valid",
            error: 1,
          });
        }
        req.user = user;
        next();
      });
    } else {
      res.status(401).json({
        message: "Not authenticated",
        error: 1,
      });
    }
  },
  verifyTokenAndAdminAuth: (req, res, next) => {
    middleWareController.verifyToken(req, res, () => {
      //   console.log(req.user);
      if (req.user.role == "admin") {
        next();
      } else {
        res.status(403).json({
          message: "You aren't allow to delete",
          error: 1,
        });
      }
    });
  },
};

export default middleWareController;
