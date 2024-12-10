import express from "express";
import tableController from "../controllers/tableController.js";

const router = express.Router();

router.get("/", tableController.getTable);
router.post("/branch", tableController.getTableByBranch);
router.get("/status", tableController.getTableStatus);

export default router;
