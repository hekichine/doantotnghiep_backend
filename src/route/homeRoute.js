import express from "express";

const router = express.Router();

const initHomeRoute = (app) => {
  router.get("/", (req, res) => {
    res.json({
      message: "Home server backend Minh Sang book store",
    });
  });

  app.use("/api", router);
};

export default initHomeRoute;
