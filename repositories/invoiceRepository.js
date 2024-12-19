import db from "../databases/database.js";
import InvoicesUnpaid from "../models/invoices/invoices.js";
import InvoicesDetail from "../models/invoices/invoicesDetail.js";
import Promotion from "../models/invoices/promotion.js";

const getInvoicesUnpaidByTableID = async (table_id) => {
  const [rows] = await db.query(
    "SELECT i.invoices_id, i.create_date, tbt.table_type_name, tb.table_price, i.total_cost, i.invoices_status_id FROM invoices i JOIN tables tb ON tb.table_id = i.table_id JOIN table_type tbt ON tbt.table_type_id = tb.table_type_id WHERE i.invoices_status_id = 2 AND i.table_id = ?",
    [table_id]
  );

  if (rows.length === 0) {
    return;
  } else {
    const invoice = InvoicesUnpaid.fromDatabase(rows[0]);
    return invoice;
  }
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
          INSERT INTO invoices (branch_id, employee_id, table_id, create_date, promotion_id, invoices_status_id) VALUES (?, ?, ?, ?, 6, 2)
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

const updateInvoicePayment = async ({
  customer_id,
  playtime,
  promotion_id,
  total_cost,
  invoices_id,
}) => {
  const query = `
          UPDATE invoices SET customer_id = ?, playtime = ?, promotion_id = ?, total_cost = ?, invoices_status_id = 1 WHERE invoices_id = ?
      `;

  const result = await db.execute(query, [
    customer_id,
    playtime,
    promotion_id,
    total_cost,
    invoices_id,
  ]);
};

const checkItemInvoice = async ({ invoice_id, service_id }) => {
  const [rows] = await db.query(
    "SELECT * FROM invoice_detail i WHERE i.invoice_id = ? AND i.service_id = ?",
    [invoice_id, service_id]
  );
  return rows.length > 0;
};

const checkMinusItemInvoice = async ({ invoice_id, service_id }) => {
  const [rows] = await db.query(
    "SELECT i.service_quantity FROM invoice_detail i WHERE i.invoice_id = ? AND i.service_id = ?",
    [invoice_id, service_id]
  );
  if (rows.length > 0 && rows[0].service_quantity > 1) {
    return true;
  }
  return false;
};

const updateItemInvoice = async ({ invoice_id, service_id }) => {
  const query = `
          UPDATE invoice_detail SET service_quantity = service_quantity + 1 WHERE invoice_id = ? AND service_id = ?;
      `;

  const [result] = await db.execute(query, [invoice_id, service_id]);

  return result.affectedRows > 0;
};

const updateMinusItemInvoice = async ({ invoice_id, service_id }) => {
  const query = `
          UPDATE invoice_detail SET service_quantity = service_quantity - 1 WHERE invoice_id = ? AND service_id = ?;
      `;

  const [result] = await db.execute(query, [invoice_id, service_id]);

  return result.affectedRows > 0;
};

const addItemIntoInvoice = async ({ invoice_id, service_id }) => {
  const query = `
          INSERT INTO invoice_detail (invoice_id, service_id, service_quantity) VALUES (?, ?, 1)
      `;

  const [result] = await db.execute(query, [invoice_id, service_id]);

  return result.affectedRows > 0;
};

const deleteItemIntoInvoice = async ({ invoice_id, service_id }) => {
  const query = `
          DELETE FROM invoice_detail WHERE invoice_id = ? AND service_id = ?
      `;

  const [result] = await db.execute(query, [invoice_id, service_id]);

  return result.affectedRows > 0;
};

const addOrUpdateItemInvoice = async ({ invoice_id, service_id }) => {
  try {
    const exists = await checkItemInvoice({ invoice_id, service_id });

    if (exists) {
      const isUpdated = await updateItemInvoice({ invoice_id, service_id });
      return isUpdated
        ? "Item updated successfully."
        : "Failed to update item.";
    } else {
      const isAdded = await addItemIntoInvoice({ invoice_id, service_id });
      return isAdded ? "Item added successfully." : "Failed to add item.";
    }
  } catch (error) {
    throw new Error(`Error in addOrUpdateItemInvoice: ${error.message}`);
  }
};

const deleteOrUpdateItemInvoice = async ({ invoice_id, service_id }) => {
  try {
    const exists = await checkMinusItemInvoice({ invoice_id, service_id });

    if (exists) {
      const isUpdated = await updateMinusItemInvoice({
        invoice_id,
        service_id,
      });
      return isUpdated
        ? "Item updated successfully."
        : "Failed to update item.";
    } else {
      const isDeleted = await deleteItemIntoInvoice({ invoice_id, service_id });
      return isDeleted
        ? "Item deleted successfully."
        : "Failed to deleted item.";
    }
  } catch (error) {
    throw new Error(`Error in addOrUpdateItemInvoice: ${error.message}`);
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
