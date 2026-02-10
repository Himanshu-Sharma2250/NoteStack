import express from "express";
import { loginUser, logoutUser, profile, registerUser } from "../controllers/auth.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", verifyJWT, profile);
router.post("/logout", verifyJWT, logoutUser);

export default router;