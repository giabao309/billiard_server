import express from "express";
import serviceController from "../controllers/serviceController.js";

const router = express.Router();

router.get("/items", serviceController.getService);
router.get("/types", serviceController.getServiceType);
router.get("/categories", serviceController.getServiceCategory);

router.post("/itemsByType", serviceController.getServiceByType);
router.post("/itemsByCate", serviceController.getServiceByCate);
router.post("/searchService", serviceController.searchService);

export default router;
