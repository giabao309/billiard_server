import express from "express";
import userController from "../controllers/userController.js";

const router = express.Router();

router.get("/employees", userController.getEmployee);
router.post("/employeesID", userController.getEmployeeByID);
router.post("/dangky", userController.registerUser);
router.post("/dangnhap", userController.login);

export default router;
