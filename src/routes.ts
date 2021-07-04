import express from "express";
import RealSpecService from "./api/spec/services/SpecService";

const router = express.Router();

router.get("/spec", new RealSpecService().getSpec);

export default router;
