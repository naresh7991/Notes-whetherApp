import { Router } from "express";
import { authenicateUser, logoutUser, registerUser, signInUser } from "../controllers/user.controller.js";

const router = Router();

router.route('/register').post(registerUser)

router.route('/signin').post(signInUser)

router.route('/authenicate').get(authenicateUser)

router.route('/logout').get(logoutUser)

export default router;