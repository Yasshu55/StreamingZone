import { Router } from "express";
import PlatformSelection from "../platformSelection.js";
const router = Router()

router.post("/auth/videoStreaming",PlatformSelection.videoPlatforms)
router.post("/auth/screenStreaming",PlatformSelection.screenPlatforms)

export default router;