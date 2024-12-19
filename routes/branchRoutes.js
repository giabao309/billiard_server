import express from "express";
import branchController from "../controllers/branchController.js";

const router = express.Router();

router.get("/", branchController.getBranch);
router.get("/address", branchController.getAddress);
router.get("/district", branchController.getDistrict);
router.post("/user", branchController.getBranchByUser);
router.post("/id", branchController.getBranchByID);
router.post("/floor", branchController.getFloorByBranch);
router.get("/branchDetails", branchController.getBranchDetailsById);
router.get("/branch2", branchController.getBranch2);
router.post("/createBranch", branchController.createBranch);

export default router;
