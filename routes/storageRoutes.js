import express from "express";
import storageController from "../controllers/storageController.js";

const router = express.Router();

router.get("/warehouseByBranch", storageController.getWarehouseByBranchId);
router.post("/warehouse/:item_id", storageController.updateWarehouseItem);
router.delete("/warehouse/:item_id", storageController.deleteWarehouseItem);
router.get("/searchWarehouse", storageController.searchWarehouseByServiceName);
router.post("/createStorage", storageController.createStorage);
router.get("/services", storageController.getServices);
router.get("/categories", storageController.getCategories);


export default router;
