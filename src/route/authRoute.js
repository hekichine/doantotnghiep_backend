import express from "express";
import authController from "../controllers/authController";
import middleWareController from "../controllers/middlewareController";

const router = express.Router();

const initAuthRoute = (app) => {
  // register
  router.post("/register", authController.registerUser);
  // login
  router.post("/login", authController.loginUser);
  // refresh token
  router.post("/refresh", authController.requestRefreshToken);
  // get
  router.get("/", (req, res) => {
    res.json({
      message: "server backend book store",
    });
  });

  // logout
  router.post(
    "/logout",
    middleWareController.verifyToken,
    authController.logoutUser
  );

  app.use("/api/auth", router);
};

export default initAuthRoute;
