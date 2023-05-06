import { userModel } from "../DB/models/userModel.js";
import { tokenFunction } from "../utils/tokenFunction.js";


export const auth = () => {
  return async (req, res, next) => {
    try {
      const { authorization } = req.headers;
      if (!authorization) {
        return res.json({ message: "please enter your token" });
      }

      if (!authorization.startsWith('Dola__')) {
        return res.json({ message: "in-valid prefix" });
      }
      const token = authorization.split('Dola__')[1];
      // console.log(typeof token);

      
      const decode = tokenFunction({ payload: token  , generate:false});
      console.log({decode});
      if (!decode || !decode.id) {
        return res.json({ message: "invalid token payload" });
      }
      const user = await userModel.findById(decode.id, "password");
      if (!user) {
        return res.json({ message: "this user does not exist anymore" });
      }
      req.user = user;
      next();
    } catch (error) {
      console.log(error);
      res.json({ Catch_Error: "catch error" });
    }
  };
};
