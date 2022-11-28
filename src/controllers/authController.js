import bcrypt from "bcrypt";
import authService from "../service/authService";

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
          res.status(200).json({
            message: "Create user successfully",
            error: 0,
            successfully: 1,
          });
        }
        res.status(500).json({
          massage: "error system",
          error: 1,
        });
      }
      res.status(500).json({
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
        res.status(404).json({
          message: "Wrong username",
          error: 1,
        });
      }

      const validPassword = await bcrypt.compare(user.password, data.password);
      console.log(validPassword);
      if (!validPassword) {
        res.status(404).json({ massage: "Wrong password", error: 1 });
      }
      res.status(200).json({
        message: "Login succesfully",
        error: 0,
        user: data,
      });
    } catch (error) {
      res.status(500).json(error);
    }
  },
};

module.exports = authController;
