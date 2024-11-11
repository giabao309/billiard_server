import express from "express";
import floorController from "../controllers/floorController.js";

const router = express.Router();

router.get("/", floorController.getFloor);

export default router;
