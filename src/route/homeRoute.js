import express from "express";

const router = express.Router();

const initHomeRoute = (app) => {
  router.get("/", (req, res) => {
    res.json({
      message: "Home server backend book store",
    });
  });

  app.use("/", router);
};

export default initHomeRoute;
