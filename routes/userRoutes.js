import express from "express";
import userController from "../controllers/userController.js";

const router = express.Router();

router.get("/employees", userController.getEmployee);
router.post("/userID", userController.getUserByID);
router.post("/employeeID", userController.getEmployeeByUserID);
router.post("/dangky", userController.registerUser);
router.post("/dangnhap", userController.login);
router.post("/customer", userController.searchCustomer);
router.post("/searchCustomerManage", userController.searchCustomer);
router.post("/searchEmployeeManage", userController.searchEmployeeManage);
router.get("/getCustomerManage", userController.getCustomer);

export default router;
