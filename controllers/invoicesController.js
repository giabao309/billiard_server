import invoiceRepository from "../repositories/invoiceRepository.js";

const getInvoicesUnpaidByTableID = async (req, res) => {
  try {
    const { table_id } = req.body;
    const invoices = await invoiceRepository.getInvoicesUnpaidByTableID(
      table_id
    );
    res.json(invoices);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const getInvoicesDetailByID = async (req, res) => {
  try {
    const { invoices_id } = req.body;
    const invoiceDetail = await invoiceRepository.getInvoicesDetailByID(
      invoices_id
    );
    res.json(invoiceDetail);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const getPromotion = async (req, res) => {
  try {
    const promotion = await invoiceRepository.getPromotion();
    res.json(promotion);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const createInvoices = async (req, res) => {
  try {
    const { branch_id, employee_id, table_id, create_date } = req.body;

    const invoice_id = await invoiceRepository.createInvoices({
      branch_id,
      employee_id,
      table_id,
      create_date,
    });

    res.status(201).json({
      message: "Thêm hoá đơn thành công",
      invoice_id,
    });
  } catch (error) {
    res.status(500).json({ message: "Lỗi: " + error.message });
  }
};

export default {
  getInvoicesUnpaidByTableID,
  createInvoices,
  getInvoicesDetailByID,
  getPromotion,
};
