import express from "express";
import branchController from "../controllers/branchController.js";

const router = express.Router();

router.get("/", branchController.getBranch);
router.get("/address", branchController.getAddress);
router.get("/district", branchController.getDistrict);
router.post("/user", branchController.getBranchByUser);
router.post("/floor", branchController.getFloorByBranch);

export default router;
