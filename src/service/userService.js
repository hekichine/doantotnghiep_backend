import User from "../models/userModel";
let userService = {
  getAll: () => {
    return new Promise(async (resolve, reject) => {
      try {
        let data = await User.find();
        if (data && data.length > 0) {
          resolve(data);
        }
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  },
  deleteUser: (id) => {
    return new Promise(async (resolve, reject) => {
      try {
        let data = await User.findById(id);
        if (data) {
          resolve(data);
        }
        reject();
      } catch (error) {
        reject(error);
      }
    });
  },
};
export default userService;
