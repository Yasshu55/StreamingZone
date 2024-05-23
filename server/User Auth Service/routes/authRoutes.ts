import { Router } from "express";
import UserController from "../controllers/UserController";
import { authMiddleware } from "../utils/AuthMiddleware";
const router = Router()

router.post("/register",UserController.register)
router.post("/login",UserController.login)

// Private Routes
router.get("/user",authMiddleware,UserController.user)

export default router;
