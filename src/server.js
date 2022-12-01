import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import bp from "body-parser";
import connectDB from "./connectDB/connectDb";
import initAuthRoute from "./route/authRoute";
import initUserRoute from "./route/userRoute";

require("dotenv").config();

const app = express();
const port = process.env.HOST || 8080;

connectDB();

// install
app.use(cors({ origin: true }));
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
