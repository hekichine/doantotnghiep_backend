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

  // logout
  router.post(
    "/logout",
    middleWareController.verifyToken,
    authController.logoutUser
  );

  app.use("/auth", router);
};

export default initAuthRoute;
