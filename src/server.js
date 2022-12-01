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
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
app.use(bp.urlencoded({ extended: true }));

// route
initAuthRoute(app);
initUserRoute(app);
initHomeRoute(app);

app.listen(port, () => {
  console.log(`server is running on http://localhost:${port}`);
});
