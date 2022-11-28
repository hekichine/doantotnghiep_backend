import express from "express";
import authController from "../controllers/authController";

const router = express.Router();

const initAuthRoute = (app) => {
  // register
  router.post("/register", authController.registerUser);
  // login
  router.post("/login", authController.loginUser);

  app.use("/auth", router);
};

export default initAuthRoute;
