import express from "express";
import tableController from "../controllers/tableController.js";

const router = express.Router();

router.get("/", tableController.getTable);

export default router;
