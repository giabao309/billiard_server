import db from "../databases/database.js";
import Table from "../models/table/table.js";
import Status from "../models/table/status.js";

const getTable = async () => {
  const [rows] = await db.query(
    "SELECT tb.table_id, tb.table_name, tb.table_price, t.table_type_name, st.table_status_id, st.table_status_name FROM tables tb JOIN table_type t ON t.table_type_id = tb.table_type_id JOIN table_status st ON st.table_status_id = tb.table_status_id"
  );
  const tablelist = rows.map((row) => Table.fromDatabase(row));
  return tablelist;
};

const getTableByBranch = async (branch_id) => {
  const [rows] = await db.query(
    "SELECT tb.table_id, tb.table_name, tb.table_price, t.table_type_name, st.table_status_id, st.table_status_name, fl.floor_id FROM tables tb JOIN table_type t ON t.table_type_id = tb.table_type_id JOIN table_status st ON st.table_status_id = tb.table_status_id JOIN floors fl ON fl.floor_id = tb.floor_id WHERE fl.branch_id = ?",
    [branch_id]
  );
  const tables = rows.map((row) => Table.fromDatabase(row));
  return tables;
};

const getTableStatus = async () => {
  const [rows] = await db.query("SELECT * from table_status");
  const status = rows.map((row) => Status.fromDatabase(row));
  return status;
};

const updateOpenTable = async (table_id) => {
  const result = await db.query(
    "UPDATE tables tb SET tb.table_status_id = 2 WHERE tb.table_id = ?",
    [table_id]
  );

  if (result.affectedRows === 0) {
    throw new Error("Bàn không tồn tại.");
  }

  return { success: true, message: "Mở bàn thành công!" };
};

const updateCloseTable = async (table_id) => {
  const result = await db.query(
    "UPDATE tables tb SET tb.table_status_id = 1 WHERE tb.table_id = ?",
    [table_id]
  );

  if (result.affectedRows === 0) {
    throw new Error("Bàn không tồn tại.");
  }

  return { success: true, message: "Đóng bàn thành công!" };
};
export default {
  getTable,
  getTableByBranch,
  getTableStatus,
  updateOpenTable,
  updateCloseTable,
};
