import db from "../databases/database.js";

const getWarehouseByBranchId = async (branch_id) => {
  const [rows] = await db.query(
    `SELECT 
    w.item_id,
    w.service_id,
    w.entry_date,
    w.entry_quantity,
    w.entry_price,
    s.service_name,
    sc.service_category_name,
    b.branch_name
FROM 
    warehouse w
JOIN 
    services s ON w.service_id = s.service_id
JOIN 
    service_type st ON s.service_type_id = st.service_type_id
JOIN 
    service_category sc ON st.service_category_id = sc.service_category_id
JOIN 
    branches b ON w.branch_id = b.branch_id
WHERE 
    w.branch_id =?`,
    [branch_id]
  );
  return rows;
};

const deleteItemById = async (item_id) => {
  const [result] = await db.query(`DELETE FROM warehouse WHERE item_id = ?`, [
    item_id,
  ]);
  return result;
};

const updateWarehouseItemById = async (item_id, data) => {
  const { service_name, service_category_name, entry_quantity, entry_price } =
    data;
  const [result] = await db.query(
    `UPDATE warehouse
         SET service_name = ?, service_category_name = ?, entry_quantity = ?, entry_price = ?
         WHERE item_id = ?`,
    [service_name, service_category_name, entry_quantity, entry_price, item_id]
  );
  return result;
};

const searchWarehouseByServiceName = async (branch_id, service_name) => {
  const query = `
        SELECT 
            w.item_id,
            w.service_id,
            w.entry_date,
            w.entry_quantity,
            w.entry_price,
            s.service_name,
            sc.service_category_name,
            b.branch_name
        FROM 
            warehouse w
        JOIN 
            services s ON w.service_id = s.service_id
        JOIN 
            service_type st ON s.service_type_id = st.service_type_id
        JOIN 
            service_category sc ON st.service_category_id = sc.service_category_id
        JOIN 
            branches b ON w.branch_id = b.branch_id
        WHERE 
            w.branch_id = ?
            AND s.service_name LIKE ?;
    `;

  const [rows] = await db.query(query, [branch_id, `%${service_name}%`]);
  return rows;
};

const createStorage = async ({ branch_id, service_id, category_id, entry_price, entry_quantity }) => {
  const [result] = await db.query(
    `INSERT INTO warehouse (branch_id, service_id, entry_date, entry_quantity, entry_price)
     VALUES (?, ?, CURRENT_DATE, ?, ?)`,
    [branch_id, service_id, entry_quantity, entry_price]
  );

  return result;
};

const getServices = async () => {
  const [rows] = await db.query(`SELECT service_id, service_name FROM services`);
  return rows;
};
const getCategories = async () => {
  const [rows] = await db.query(`SELECT service_category_id, service_category_name FROM service_category`);
  return rows;
};

export default {
  getWarehouseByBranchId,
  deleteItemById,
  updateWarehouseItemById,
  searchWarehouseByServiceName,
  createStorage,
  getServices,
  getCategories
};
