import db from "../databases/database.js";
import Table from "../models/manage/tables/tableModel.js";
import Floor from "../models/manage/floors/floorModel.js";
import Type from "../models/manage/tables/tableTypeModel.js";
import Shift from "../models/manage/employees/shiftModel.js";
import Customer from "../models/manage/customers/customerModel.js";
import Invoices from "../models/manage/invoices/invoiceModel.js";

const getTableByBrachManage = async (branch_id) => {
  const [rows] = await db.query(
    "SELECT t.table_id, t.table_name,t.floor_id, f.floor_name,t.table_type_id, tp.table_type_name,t.table_status_id, st.table_status_name, t.table_price FROM tables t JOIN table_status st ON st.table_status_id = t.table_status_id JOIN table_type tp ON tp.table_type_id = t.table_type_id JOIN floors f ON f.floor_id = t.floor_id JOIN branches b ON b.branch_id = f.branch_id WHERE b.branch_id = ?",
    [branch_id]
  );
  const tables = rows.map((row) => Table.fromDatabase(row));
  return tables;
};

const getFloorByBrachManage = async (branch_id) => {
  const [rows] = await db.query(
    "SELECT * FROM floors f WHERE f.branch_id = ?",
    [branch_id]
  );
  const floors = rows.map((row) => Floor.fromDatabase(row));
  return floors;
};

const getTableType = async () => {
  const [rows] = await db.query("SELECT * FROM table_type");
  const types = rows.map((row) => Type.fromDatabase(row));
  return types;
};

const getShift = async () => {
  const [rows] = await db.query("SELECT * FROM shifts");
  const shifts = rows.map((row) => Shift.fromDatabase(row));
  return shifts;
};

const getCustomer = async () => {
  const [rows] = await db.query(
    "SELECT * FROM users u JOIN membership m ON m.membership_id = u.membership_id WHERE u.role_id = 3"
  );
  const customers = rows.map((row) => Customer.fromDatabase(row));
  return customers;
};

const getViewInvoice = async (user_id) => {
  const [rows] = await db.query(
    "SELECT i.invoices_id, br.branch_name, u.user_name, tb.table_name, i.create_date, pr.promotion_name, i.total_cost FROM invoices i JOIN branches br ON br.branch_id = i.branch_id JOIN tables tb ON tb.table_id = i.table_id JOIN employees e ON e.employee_id = i.employee_id JOIN user_employee ue ON ue.employee_id = e.employee_id JOIN users u ON u.user_id = ue.user_id JOIN promotion pr ON pr.promotion_id = i.promotion_id WHERE i.customer_id = ?",
    [user_id]
  );
  const invoices = rows.map((row) => Invoices.fromDatabase(row));
  return invoices;
};

const getCustomerByID = async (user_id) => {
  const [rows] = await db.query(
    "SELECT * FROM users u JOIN membership m ON m.membership_id = u.membership_id WHERE u.role_id = 3 AND u.user_id = ?",
    [user_id]
  );
  const customers = Customer.fromDatabase(rows[0]);
  return customers;
};

const searchCustomerManage = async (query) => {
  const [rows] = await db.query(
    "SELECT * FROM users u JOIN membership m ON m.membership_id = u.membership_id WHERE (u.email LIKE ? OR u.numberphone LIKE ?) AND u.role_id = 3",
    [`%${query}%`, `%${query}%`]
  );
  const customer = rows.map((row) => Customer.fromDatabase(row));
  return customer;
};

const updateTableManage = async ({
  name,
  floor_id,
  type_id,
  status_id,
  price,
  table_id,
}) => {
  const result = await db.query(
    "UPDATE tables SET table_name = ?, floor_id = ?, table_type_id = ?, table_status_id = ?, table_price = ? WHERE table_id = ?;",
    [name, floor_id, type_id, status_id, price, table_id]
  );
  if (result.affectedRows === 0) {
    throw new Error("false");
  }

  return { message: "Update thành công" };
};

const updateEmployeeByEmployeeID = async ({
  branch_id,
  shift_id,
  salary,
  employee_id,
}) => {
  const result = await db.query(
    "UPDATE employees SET branch_id = ?, shift_id = ?, salary = ? WHERE employee_id = ?",
    [branch_id, shift_id, salary, employee_id]
  );
  return result;
};

const addEmployee = async ({ branch_id, shift_id, salary, user_id }) => {
  const connection = await db.getConnection();
  try {
    // Start the transaction
    await connection.query("START TRANSACTION");

    // Insert into the employees table
    const insertEmployeeResult = await connection.query(
      "INSERT INTO employees (shift_id, salary, branch_id) VALUES (?, ?, ?)",
      [shift_id, salary, branch_id]
    );

    const [maxID] = await connection.query(
      "SELECT MAX(employee_id) AS max_id FROM employees"
    );

    const maxEmployee = maxID[0]?.max_id || 0;

    if (maxEmployee === 0) {
      throw new Error("Failed to retrieve the last inserted employee_id.");
    }

    // Update the user role
    const updateRoleResult = await connection.query(
      "UPDATE users SET role_id = 2 WHERE user_id = ?",
      [user_id]
    );

    if (updateRoleResult.affectedRows === 0) {
      throw new Error("Failed to update user role.");
    }

    // Insert into the user_employee table
    await connection.query(
      "INSERT INTO user_employee (user_id, employee_id) VALUES (?, ?)",
      [user_id, maxEmployee]
    );

    // Commit the transaction
    await connection.query("COMMIT");

    return { success: true, message: "Employee added successfully!" };
  } catch (error) {
    // Rollback the transaction if any error occurs
    await connection.query("ROLLBACK");
    console.error("Error adding employee:", error.message);
    throw new Error("Failed to add employee.");
  } finally {
    connection.release();
  }
};

const deleteEmployee = async ({ user_id, employee_id }) => {
  const connection = await db.getConnection();
  try {
    await connection.query("START TRANSACTION");

    await connection.query("DELETE FROM user_employee WHERE user_id = ?", [
      user_id,
    ]);

    await connection.query("DELETE FROM employees WHERE employee_id = ?", [
      employee_id,
    ]);

    await connection.query("UPDATE users SET role_id = 3 WHERE user_id = ?", [
      user_id,
    ]);

    await connection.query("COMMIT");

    return { success: true, message: "Employee delete successfully!" };
  } catch (error) {
    // Rollback the transaction if any error occurs
    await connection.query("ROLLBACK");
    console.error("Error adding employee:", error.message);
    throw new Error("Failed to add employee.");
  } finally {
    connection.release();
  }
};

export default {
  getTableByBrachManage,
  getFloorByBrachManage,
  getTableType,
  updateTableManage,
  getShift,
  updateEmployeeByEmployeeID,
  addEmployee,
  deleteEmployee,
  getCustomer,
  searchCustomerManage,
  getCustomerByID,
  getViewInvoice,
};
