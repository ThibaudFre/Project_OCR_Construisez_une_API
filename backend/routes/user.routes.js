import express from "express";
export const router = express.Router();
import * as userCtrl from "../controllers/user.controller";

router.post("/api/auth/signup", userCtrl.signUp);
router.post("/api/auth/login", userCtrl.logIn);