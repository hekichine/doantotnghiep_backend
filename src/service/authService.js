import User from "../models/userModel";

let authService = {
  findUser: (name) => {
    return new Promise(async (resolve, reject) => {
      try {
        let data = await User.findOne({ username: name }).exec();

        if (data) {
          resolve(data);
        }
      } catch (error) {
        reject(error);
      }
    });
  },
  createUser: (newUser) => {
    return new Promise(async (resolve, reject) => {
      try {
        let data = await User.insertMany(newUser);
        if (data && data.length > 0) {
          resolve(true);
        }
        resolve(false);
      } catch (error) {
        reject(error);
      }
    });
  },
};
export default authService;
