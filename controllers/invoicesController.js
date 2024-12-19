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

const updateInvoicePayment = async (req, res) => {
  try {
    const { customer_id, playtime, promotion_id, total_cost, invoices_id } =
      req.body;

    const invoice_id = await invoiceRepository.updateInvoicePayment({
      customer_id,
      playtime,
      promotion_id,
      total_cost,
      invoices_id,
    });

    res.status(201).json({
      message: "Thanh toán thành công",
      invoice_id,
    });
  } catch (error) {
    res.status(500).json({ message: "Lỗi: " + error.message });
  }
};

const addOrUpdateItemInvoice = async (req, res) => {
  try {
    const { invoice_id, service_id } = req.body;
    const invoiceDetail = await invoiceRepository.addOrUpdateItemInvoice({
      invoice_id,
      service_id,
    });
    res.json(invoiceDetail);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const deleteOrUpdateItemInvoice = async (req, res) => {
  try {
    const { invoice_id, service_id } = req.body;
    const invoiceDetail = await invoiceRepository.deleteOrUpdateItemInvoice({
      invoice_id,
      service_id,
    });
    res.json(invoiceDetail);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export default {
  getInvoicesUnpaidByTableID,
  createInvoices,
  getInvoicesDetailByID,
  getPromotion,
  updateInvoicePayment,
  addOrUpdateItemInvoice,
  deleteOrUpdateItemInvoice,
};
