import express from "express";
import tableController from "../controllers/tableController.js";

const router = express.Router();

router.get("/", tableController.getTable);
router.post("/branch", tableController.getTableByBranch);
router.post("/BranchAndFloor", tableController.getTableByBranchAndFloor);
router.post("/BranchAndStatus", tableController.getTableByBranchAndStatus);
router.post("/id", tableController.getTableByID);
router.get("/status", tableController.getTableStatus);
router.post("/openTable", tableController.updateOpenTable);
router.post("/closeTable", tableController.updateCloseTable);

export default router;
