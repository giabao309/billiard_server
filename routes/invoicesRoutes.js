import express from "express";
import invoicesController from "../controllers/invoicesController.js";

const router = express.Router();

router.post("/id", invoicesController.getInvoicesUnpaidByTableID);
router.post("/createInvoices", invoicesController.createInvoices);
router.post("/getInvoiceDetail", invoicesController.getInvoicesDetailByID);
router.get("/promotion", invoicesController.getPromotion);
router.post("/payment", invoicesController.updateInvoicePayment);

export default router;
