import express from "express";
import { login, protectRoute, signUp, me } from "../controllers/authController";

const router = express.Router();

router.post("/signup", signUp);
router.post("/login", login);
router.get("/me", protectRoute, me);

export default router;
