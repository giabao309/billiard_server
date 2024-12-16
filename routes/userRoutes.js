import express from "express";
import userController from "../controllers/userController.js";

const router = express.Router();

router.get("/employees", userController.getEmployee);
router.post("/userID", userController.getUserByID);
router.post("/employeeID", userController.getEmployeeByUserID);
router.post("/dangky", userController.registerUser);
router.post("/dangnhap", userController.login);
router.post("/customer", userController.searchCustomer);

export default router;
