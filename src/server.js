import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import bp from "body-parser";
import connectDB from "./connectDB/connectDb";
import initAuthRoute from "./route/authRoute";
import initUserRoute from "./route/userRoute";
import initHomeRoute from "./route/homeRoute";

require("dotenv").config();

const app = express();
const port = process.env.HOST || 8080;

connectDB();

// install
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(bp.urlencoded({ extended: true }));

// route
initAuthRoute(app);
initUserRoute(app);
initHomeRoute(app);

// enable cor
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", process.env.REACT_URL);

  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,OPTIONS,PATCH,DELETE,POST,PUT"
  );

  res.setHeader(
    "Access-Control-Allow-Headers",
    " X-Requested-With, Content-Type"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

app.listen(port, () => {
  console.log(`server is running on http://localhost:${port}`);
});
