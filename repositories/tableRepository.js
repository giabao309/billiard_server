import db from "../databases/database.js";
import Table from "../models/table.js";

const getTable = async () => {
  const [rows] = await db.query(
    "SELECT tb.table_id, tb.table_name, tb.table_price, t.table_type_name, st.table_status_name FROM tables tb JOIN table_type t ON t.table_type_id = tb.table_type_id JOIN table_status st ON st.table_status_id = tb.table_status_id;"
  );
  const tablelist = rows.map((table) => {
    const tb = new Table(
      table.table_id,
      table.table_name,
      table.table_price,
      table.table_type_name,
      table.table_status_name
    );
    return tb;
  });
  return tablelist;
};
export default { getTable };
