import { Router } from "express";
import PlatformSelection from "../PlatformSelection.js";
const router = Router()

router.post("/videoStreaming",PlatformSelection.videoPlatforms)
router.post("/screenStreaming",PlatformSelection.screenPlatforms)

export default router;