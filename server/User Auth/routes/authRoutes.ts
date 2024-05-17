import { Router } from "express";
import UserController from "../controllers/UserController";
import { authMiddleware } from "../utils/AuthMiddleware";
const router = Router()

router.post("/auth/register",UserController.register)
router.post("/auth/login",UserController.login)

// Private Routes
router.get("/auth/user",authMiddleware,UserController.user)

export default router;
