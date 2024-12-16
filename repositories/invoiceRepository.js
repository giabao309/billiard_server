import db from "../databases/database.js";
import InvoicesUnpaid from "../models/invoices/invoices.js";
import InvoicesDetail from "../models/invoices/invoicesDetail.js";
import Promotion from "../models/invoices/promotion.js";

const getInvoicesUnpaidByTableID = async (table_id) => {
  const [rows] = await db.query(
    "SELECT i.invoices_id, i.create_date, tbt.table_type_name, tb.table_price, i.total_cost FROM invoices i JOIN tables tb ON tb.table_id = i.table_id JOIN table_type tbt ON tbt.table_type_id = tb.table_type_id WHERE i.invoices_status_id = 2 AND i.table_id = ?",
    [table_id]
  );
  const invoice = InvoicesUnpaid.fromDatabase(rows[0]);
  return invoice;
};

const getInvoicesDetailByID = async (invoices_id) => {
  const [rows] = await db.query(
    "SELECT id.invoice_detail_id, sr.service_id, sr.service_name, sr.service_price, id.service_quantity FROM invoice_detail id JOIN services sr ON sr.service_id = id.service_id WHERE id.invoice_id = ?",
    [invoices_id]
  );
  const invoiceDetail = rows.map((row) => InvoicesDetail.fromDatabase(row));
  return invoiceDetail;
};

const getPromotion = async () => {
  const [rows] = await db.query("SELECT * FROM promotion");
  const promotion = rows.map((row) => Promotion.fromDatabase(row));
  return promotion;
};

const createInvoices = async ({
  branch_id,
  employee_id,
  table_id,
  create_date,
}) => {
  try {
    const query = `
          INSERT INTO invoices (branch_id, employee_id, table_id, create_date, invoices_status_id) VALUES (?, ?, ?, ?, 2)
      `;

    const [result] = await db.execute(query, [
      branch_id,
      employee_id,
      table_id,
      create_date,
    ]);

    return result.insertId;
  } catch (error) {
    throw new Error(error.message);
  }
};

export default {
  getInvoicesUnpaidByTableID,
  createInvoices,
  getInvoicesDetailByID,
  getPromotion,
};
