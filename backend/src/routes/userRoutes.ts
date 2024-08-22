import express from "express";
import {
  login,
  protectRoute,
  signUp,
  me,
  refreshToken,
} from "../controllers/authController";

const router = express.Router();

router.post("/signup", signUp);
router.post("/login", login);
router.get("/me", protectRoute, me);
router.post("/refresh", refreshToken);

export default router;
