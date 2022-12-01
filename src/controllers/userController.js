import userService from "../service/userService";

const userController = {
  // get all user
  getAllUser: async (req, res) => {
    try {
      let data = await userService.getAll();
      if (data) {
        return res.status(200).json({
          massage: "all user",
          data: data,
          error: 0,
        });
      }
    } catch (error) {
      res.status(500).json({
        message: "error",
        error: 1,
      });
    }
  },
  deleteUser: async (req, res) => {
    try {
      const id = req.params.id;
      let data = await userService.deleteUser(id);
      console.log(data);
      if (data) {
        return res.status(200).json({
          massage: "Delete successfully",
          error: 0,
          success: 1,
        });
      }
    } catch (error) {
      res.status(500).json({
        massage: "error",
        error: 1,
      });
    }
  },
};
export default userController;
