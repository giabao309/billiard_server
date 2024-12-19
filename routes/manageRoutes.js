import express from "express";
import manageController from "../controllers/manageController.js";

const router = express.Router();

router.post("/tableByBranch", manageController.getTableByBrachManage);
router.post("/floorByBranch", manageController.getFloorByBrachManage);
router.get("/tableTypeManage", manageController.getTableType);
router.get("/shifts", manageController.getShift);
router.get("/customers", manageController.getCustomer);
router.post("/searchCustomers", manageController.searchCustomerManage);
router.post("/customerByID", manageController.getCustomerByID);
router.post("/updateTableManage", manageController.updateTableManage);
router.post("/updateEmployee", manageController.updateEmployeeByEmployeeID);
router.post("/addEmployee", manageController.addEmployee);
router.post("/deleteEmployee", manageController.deleteEmployee);
router.post("/viewInvoice", manageController.getViewInvoice);

export default router;
