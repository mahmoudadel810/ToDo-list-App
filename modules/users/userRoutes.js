import { Router } from "express";
import { auth } from "../../middlewares/auth.js";
import { validation } from "../../middlewares/validation.js";
import { loginValidator, signUpValidator, updateValidator } from "./user.validation.js";

const router = Router();
import * as userController from './userController.js'


router.post('/signUp', validation(signUpValidator), userController.signUp);
router.post('/signIn', validation(loginValidator), userController.signIn);
router.put('/updateProfile', auth(), validation(updateValidator), userController.updateProfile);
router.delete('/deleteProfile/:user_id', auth(), userController.deleteProfile)
router.post('/logOut' , auth() , userController.logOut)

export default router;