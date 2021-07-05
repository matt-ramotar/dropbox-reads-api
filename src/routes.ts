import express from "express";
import RealAuthService from "./api/auth/services/AuthService";
import RealSpecService from "./api/spec/services/SpecService";

const router = express.Router();

router.post("/auth/continue/google", new RealAuthService().continueWithGoogle);

router.get("/spec", new RealSpecService().getSpec);

export default router;
