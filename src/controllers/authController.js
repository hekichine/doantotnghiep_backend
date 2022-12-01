import bcrypt from "bcrypt";
import authService from "../service/authService";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const key = process.env.KEYACCESS;
const refreshKey = process.env.REFRESHKEY;
const tokenTime = process.env.TOKENTIME;
const refreshTokenTime = process.env.REFRESHTOKENTIME;

const authController = {
  // register
  registerUser: async (req, res) => {
    try {
      let user = req.body;

      const salt = await bcrypt.genSalt(10);
      const hashed = await bcrypt.hash(user.password, salt);

      //   create new user
      const newUser = {
        username: user.username,
        email: user.email,
        password: hashed,
      };
      //save to db
      let findAccount = await authService.findUser(user.username);
      if (!findAccount) {
        let addUser = await authService.createUser(newUser);
        if (addUser) {
          return res.status(200).json({
            message: "Create user successfully",
            error: 0,
            successfully: 1,
          });
        }
      }
      res.status(200).json({
        message: "Account already exists",
        error: 1,
        errorcode: 1,
      });
    } catch (err) {
      res.status(500).json(err);
    }
  },
  loginUser: async (req, res) => {
    try {
      let user = req.body;
      let data = await authService.findUser(user.username);
      if (!data) {
        return res.status(200).json({
          message: "Wrong username",
          error: 1,
        });
      }
      const validPassword = await bcrypt.compare(user.password, data.password);
      if (!validPassword) {
        return res.status(200).json({
          message: "Wrong password",
          error: 1,
        });
      }
      // /jwt
      if (user && validPassword) {
        let accessToken = authController.generateAccessToken(data);
        let refreshToken = authController.generateRefreshToken(data);
        let { password, ...rest } = data._doc;
        // save refreshtoken vao cookies
        res.cookie("refreshToken", refreshToken, {
          httpOnly: true,
          secure: false,
          path: "/",
          sameSite: "strict",
        });
        res.status(200).json({
          message: "Login succesfully",
          error: 0,
          data: rest,
          accessToken: accessToken,
        });
      }
    } catch (error) {
      res.status(500).json({
        message: "error",
        error: error,
      });
    }
  },
  // generate accesstoken
  generateAccessToken: (data) => {
    return jwt.sign(
      {
        id: data.id,
        role: data.role,
        name: data.username,
      },
      key,
      { expiresIn: tokenTime }
    );
  },
  // generate refresh token
  generateRefreshToken: (data) => {
    return jwt.sign(
      {
        id: data.id,
        role: data.role,
        name: data.username,
      },
      refreshKey,
      { expiresIn: refreshTokenTime }
    );
  },
  requestRefreshToken: async (req, res) => {
    // lay refresh token tu cookie
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      return res.status(200).json({
        message: "You're not authenticated",
        error: 1,
      });
    }
    jwt.verify(refreshToken, refreshKey, (err, user) => {
      if (err) {
        return res.status(404).json({
          message: "Error",
          error: 1,
        });
      }
      let newAccessToken = authController.generateAccessToken(user);
      let newRefreshToken = authController.generateRefreshToken(user);
      res.cookie("newRefreshToken", newRefreshToken, {
        httpOnly: true,
        secure: false,
        path: "/",
        sameSite: "strict",
      });
      res.status(200).json({
        message: "New Access Token",
        newAccessToken: newAccessToken,
      });
    });
  },
  // logout
  logoutUser: async (req, res) => {
    res.clearCookie("refreshToken");
    res.status(200).json({
      message: "Logout Success!",
      error: 0,
    });
  },
};

module.exports = authController;
