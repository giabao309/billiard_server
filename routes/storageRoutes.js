import express from "express";
import storageController from "../controllers/storageController.js";

const router = express.Router();

router.get("/warehouseByBranch", storageController.getWarehouseByBranchId);
router.post("/warehouse/:item_id", storageController.updateWarehouseItem);
router.delete("/warehouse/:item_id", storageController.deleteWarehouseItem);
router.get("/searchWarehouse", storageController.searchWarehouseByServiceName);

export default router;
