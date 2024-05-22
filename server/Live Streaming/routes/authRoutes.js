import { Router } from "express";
import LiveStreaming from "../LiveStreaming.js";
import PlatformSelection from "../platformSelection.js";
const router = Router()

router.post("/auth/platformSelection",PlatformSelection.platforms)

export default router;