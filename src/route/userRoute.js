import express from "express";
import userController from "../controllers/userController";
import middleWareController from "../controllers/middlewareController";

const router = express.Router();

const initUserRoute = (app) => {
  //   get all user
  router.get("/", middleWareController.verifyToken, userController.getAllUser);
  router.get("/getall", userController.getAllUser);
  //   delete
  router.delete(
    "/delete/:id",
    middleWareController.verifyTokenAndAdminAuth,
    userController.deleteUser
  );

  app.use("/api/user", router);
};

export default initUserRoute;