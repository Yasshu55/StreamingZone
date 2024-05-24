import { Router } from "express";
import PlatformSelection from "../platformSelection.js";
const router = Router()

router.post("/videoStreaming",PlatformSelection.videoPlatforms)
router.post("/screenStreaming",PlatformSelection.screenPlatforms)

export default router;